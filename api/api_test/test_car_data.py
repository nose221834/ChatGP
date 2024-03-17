from fastapi import APIRouter, Security,Depends
from chat_gpt.status_generation import status_generate_chatgpt
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
        text_user_input (str): ユーザーの入力  
    Returns:  
        player_car_image (bytes): 生成された車画像のバイナリー  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文  

    """

    # あらかじめ作成した画像(バイナリー)を取得
    with open("api_test/test_media/removed_test_car.bin","rb") as f:
        binary_data = f.read()
    
    # 画像を左右反転
    binary_data = reverse_image(binary_data)

    # 出力するする車のステータスを設定
    name = 'Test Car'
    luk = 4
    text_car_status = 'サバンナをかける豹のように、あなたの車は速く、そして美しいです。'
    
    return {PlayerCarKeys.image: b64encode(binary_data),
            PlayerCarKeys.name: name,
            PlayerCarKeys.luck: luk,
            PlayerCarKeys.instruction: text_car_status}


@router.get("/test/car/create/status")
async def test_generate_car_status(input_text_model:InputTextModel = Depends(),api_key: str = Security(validate_api_key)):

    """
    ChatGPTのテキスト生成機能確認用API  
    プロンプトの性能確認など
    Args:  
        text_user_input (str): ユーザーの入力  
    Returns:  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文   

    """
    # ChatGPTの入力は日本語より英語の方がトークン数を抑えれるため,DeepLで英語に翻訳.(DeepL APIは無料)
    text_en = translation(input_text_model.text_user_input,'JA','EN-US')

    # ユーザー入力からステータスを生成
    [luk,name,text_car_status] = await status_generate_chatgpt(text_en)

    # ChatGPTの出力(英語)を日本語に翻訳
    text_jp = translation(text_car_status,'EN','JA')

    return {"name": name,"luk": luk,"text_car_status": text_jp}


