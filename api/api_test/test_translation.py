from utils.translation import translation
from fastapi import APIRouter

router = APIRouter()

@router.get("/test/translation")
def translation_jp_to_en(text: str):
    #日本語を英語に翻訳.
    return {"en_text": translation(text,'JA','EN-US')}