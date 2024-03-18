from fastapi import APIRouter, Security,Depends
from fastapi.responses import Response
from chat_gpt.image_generation import generate_car_img_by_chatgpt
from utils.auth import validate_api_key
from chat_gpt.status_generation import generate_car_status_by_chatgpt
from utils.translation import translation
from validator.chat_gpt_validator import validate_token_count
import asyncio
from config import PlayerCarKeys
from models import InputTextModel

router = APIRouter()


@router.get("/car/create")
async def generate_car_by_chatgpt(input_text_model:InputTextModel = Depends(), api_key: str = Security(validate_api_key)):
    """
        ユーザーの入力を元にChatGPTが車を作成する  

    Args:  
        input_text_model (InputTextModel): ユーザーの入力  
    Returns:  
        player_car_image (bytes): 生成された車画像のバイナリー  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文 
        api_key (str): APIにアクセスするために必要なセキュリティーキー

        Raises:
            HTTP_408_REQUEST_TIMEOUT: ChatGPTの出力がフォーマットに則っていない
            HTTP_400_BAD_REQUEST: ユーザーの入力がトークンの上限を超えた.
    """

    # ユーザー入力を英語に翻訳
    text_en = translation(input_text_model.text_inputted_by_user,'JA','EN-US')
    
    # 入力トークンが上限(30トークン)を超えていないかチェック
    # 問題ない場合,ユーザー入力を元に,ChatGPTで車の設定と画像を生成.
    if validate_token_count(text_en,30):
        url_car_img, [player_luck,car_name,text_car_status] = await asyncio.gather(
            generate_car_img_by_chatgpt(text_en),
            generate_car_status_by_chatgpt(text_en)
        )

    # ChatGPTの出力を日本語に翻訳
    text_jp = translation(text_car_status,'EN','JA')


    return {PlayerCarKeys.image: url_car_img,
            PlayerCarKeys.car_name: car_name,
            PlayerCarKeys.luck: player_luck,
            PlayerCarKeys.instruction: text_jp}
