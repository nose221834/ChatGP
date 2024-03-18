from fastapi import APIRouter, Security,Depends
from chat_gpt.status_generation import generate_car_status_by_chatgpt
from utils.translation import translation
from utils.auth import validate_api_key
from transformers import GPT2Tokenizer
from base64 import b64encode
from config import PlayerCarKeys
from models import InputTextModel
from utils.reverse_image import reverse_image

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
router = APIRouter()


@router.get("/car/create")
def test_generate_car_by_chatgpt(input_text_model:InputTextModel = Depends(),api_key: str = Security(validate_api_key)):

    """
    フロント動作確認の際に,chat_gpt/car_data.pyの代わりに使用するAPI.
    ChatGPTを使用性ないため,料金が発生しない.

    Args:  
        text_inputted_by_user (str): ユーザーの入力  
    Returns:  
        player_car_image (bytes): 生成された車画像のバイナリー  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文  

    """

    # あらかじめ作成した画像(バイナリー)を取得
    with open("api_test/test_media/removed_test_car.bin","rb") as f:
        car_img_binary = f.read()
    
    # 画像を左右反転
    car_img_binary = reverse_image(car_img_binary)

    # 出力するする車のステータスを設定
    car_name = 'Test Car'
    player_luck = 4
    text_car_status = 'サバンナをかける豹のように、あなたの車は速く、そして美しいです。'
    
    return {PlayerCarKeys.image: b64encode(car_img_binary),
            PlayerCarKeys.car_name: car_name,
            PlayerCarKeys.luck: player_luck,
            PlayerCarKeys.instruction: text_car_status}


@router.get("/test/car/create/status")
async def test_generate_car_status(input_text_model:InputTextModel = Depends(),api_key: str = Security(validate_api_key)):

    """
    ChatGPTのテキスト生成機能確認用API  
    プロンプトの性能確認など
    Args:  
        text_inputted_by_user (str): ユーザーの入力  
    Returns:  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文   

    """
    # ChatGPTの入力は日本語より英語の方がトークン数を抑えれるため,DeepLで英語に翻訳.(DeepL APIは無料)
    text_en = translation(input_text_model.text_inputted_by_user,'JA','EN-US')

    # ユーザー入力からステータスを生成
    [layer_luck,car_name,text_car_status] = await generate_car_status_by_chatgpt(text_en)

    # ChatGPTの出力(英語)を日本語に翻訳
    text_jp = translation(text_car_status,'EN','JA')

    return {"name": car_name,"luk": layer_luck,"text_car_status": text_jp}


