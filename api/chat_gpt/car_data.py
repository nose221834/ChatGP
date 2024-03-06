from fastapi import APIRouter, Security
from fastapi.responses import Response
from chat_gpt.image_generation import image_generate_chatgpt
from utils.auth import validate_api_key
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from utils.car_data_validator import validate_token_count
import asyncio

router = APIRouter()


@router.get("/{player}/car/data")
async def make_car(player: str,text: str, api_key: str = Security(validate_api_key)):

    text_en = translation(text,'JA','EN-US')
    
    if validate_token_count(text_en,30):
        url_car_img, [luk,name,text_car_status] = await asyncio.gather(
            image_generate_chatgpt(text_en),
            status_generate_chatgpt(text_en)
        )

    
    text_jp = translation(text_car_status,'EN','JA')


    return {"url_car_img": url_car_img,"name": name,"luk": luk,"text_car_status": text_jp}
