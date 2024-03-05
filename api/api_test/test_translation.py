from utils.translation import translation
from fastapi import APIRouter, Security
from utils.auth import validate_api_key

router = APIRouter()

@router.get("/test/translation")
def translation_jp_to_en(text: str, api_key: str = Security(validate_api_key)):
    #日本語を英語に翻訳.
    return {"en_text": translation(text,'JA','EN-US')}