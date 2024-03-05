from fastapi import APIRouter, Security
from fastapi.responses import Response
from chat_gpt.image_generation import image_generate_chatgpt
from utils.auth import validate_api_key

router = APIRouter()

@router.get("/{player}")
def make_car(player: str,text: str, api_key: str = Security(validate_api_key)):
    url_car_img = image_generate_chatgpt(text)
    return {"url_car_img": url_car_img}