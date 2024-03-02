import requests
from fastapi import APIRouter
from fastapi.responses import Response

router = APIRouter()


@router.get("/{prayer}")
def test_make_car(prayer: str,text: str):

    with open('api_test/test_img_binary.bin', 'rb') as file:
        car_img_binary = file.read()
    
    return Response(content=car_img_binary, media_type="image/png")


