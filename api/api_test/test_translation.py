from fastapi import APIRouter, Security,Depends
from utils.translation import translation
from fastapi import APIRouter, Security
from utils.auth import validate_api_key
from models import InputTextModel

router = APIRouter()

@router.get("/test/translation")
def translate_jp_to_en(input_text_model:InputTextModel = Depends(),api_key: str = Security(validate_api_key)):
    """
        DeepLによる翻訳API  
    Args:  
        text_inputted_by_user (str): ユーザーの入力(日本語) 
    Returns:  
        en_text (str): 英語に翻訳後のテキスト
    """

    # 日本語を英語に翻訳.
    return {"en_text": translation(input_text_model.text_inputted_by_user,'JA','EN-US')}