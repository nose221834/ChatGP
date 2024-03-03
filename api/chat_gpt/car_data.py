from fastapi import APIRouter
from fastapi.responses import Response
from chat_gpt.image_generation import image_generate_chatgpt


router = APIRouter()

@router.get("/{player}")
def make_car(player: str,text: str):
    url_car_img = image_generate_chatgpt(text)

    return {"url_car_img": url_car_img}