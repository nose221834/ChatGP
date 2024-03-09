from fastapi import APIRouter, Security
from fastapi.responses import Response
from chat_gpt.image_generation import image_generate_chatgpt
from utils.auth import validate_api_key
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from chat_gpt.chat_gpt_validator import validate_token_count
import asyncio
from config import PlayerCarKeys

router = APIRouter()


@router.get("/car/data")
async def make_car(text: str, api_key: str = Security(validate_api_key)):

    text_en = translation(text,'JA','EN-US')
    
    if validate_token_count(text_en,30):
        url_car_img, [luk,name,text_car_status] = await asyncio.gather(
            image_generate_chatgpt(text_en),
            status_generate_chatgpt(text_en)
        )

    
    text_jp = translation(text_car_status,'EN','JA')


    return {PlayerCarKeys.image: url_car_img,
            PlayerCarKeys.name: name,
            PlayerCarKeys.luck: luk,
            PlayerCarKeys.instruction: text_jp}
