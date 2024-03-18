from fastapi import APIRouter, Security,Depends,HTTPException,status
from fastapi.responses import Response
from chat_gpt.image_generation import image_generate_chatgpt
from utils.auth import validate_api_key
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from validator.chat_gpt_validator import validate_token_count
import asyncio
import os
from config import PlayerCarKeys
from models import InputTextModel

router = APIRouter()


@router.get("/car/create")
async def make_car(input_text_model:InputTextModel = Depends(), api_key: str = Security(validate_api_key)):
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

    IMAGE_MODEL_CHATGPT = os.getenv('IMAGE_MODEL_CHATGPT')

    if IMAGE_MODEL_CHATGPT == "dall-e-2":
        img_size = "256x256"
    elif IMAGE_MODEL_CHATGPT == "dall-e-3":
        img_size = "1024x1024"
    else:
        raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="There is an error in the name of the model",
            )

    # ユーザー入力を英語に翻訳
    text_en = translation(input_text_model.text_user_input,'JA','EN-US')
    
    # 入力トークンが上限(30トークン)を超えていないかチェック
    # 問題ない場合,ユーザー入力を元に,ChatGPTで車の設定と画像を生成.
    if validate_token_count(text_en,30):
        url_car_img, [luk,name,text_car_status] = await asyncio.gather(
            image_generate_chatgpt(text_en,IMAGE_MODEL_CHATGPT,img_size),
            status_generate_chatgpt(text_en)
        )

    # ChatGPTの出力を日本語に翻訳
    text_jp = translation(text_car_status,'EN','JA')


    return {PlayerCarKeys.image: url_car_img,
            PlayerCarKeys.name: name,
            PlayerCarKeys.luck: luk,
            PlayerCarKeys.instruction: text_jp}
