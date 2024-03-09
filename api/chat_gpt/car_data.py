from fastapi import APIRouter, Security,Depends
from fastapi.responses import Response
from chat_gpt.image_generation import image_generate_chatgpt
from utils.auth import validate_api_key
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from chat_gpt.chat_gpt_validator import validate_token_count
import asyncio
from config import PlayerCarKeys
from models import InputTextModel

router = APIRouter()


@router.get("/car/create")
async def make_car(input_text_model:InputTextModel, api_key: str = Security(validate_api_key)):

    text_en = translation(input_text_model.text_user_input,'JA','EN-US')
    
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
