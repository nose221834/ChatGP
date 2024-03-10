from fastapi import APIRouter, Security,Depends
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from utils.auth import validate_api_key
from transformers import GPT2Tokenizer
from base64 import b64encode
from config import PlayerCarKeys
from models import InputTextModel
from utils.revere_image import reverse_image

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
router = APIRouter()


@router.get("/car/create")
def test_make_car(input_text_model:InputTextModel = Depends(),api_key: str = Security(validate_api_key)):

    with open("api_test/test_media/removed_gpt_car.bin","rb") as f:
        binary_data = f.read()
    binary_data = reverse_image(binary_data)
    name = 'Feline Fury'
    luk = 4
    text_car_status = '洗練されたエクステリア、居心地の良いインテリア、そしてエンターテイメント用の内蔵レーザーポインターなどの先進機能で、この車は猫愛好家のために完璧にデザインされている。すべてのドライブがキャットウォークのように感じられること請け合いだ。ニャーベラス！'
    
    return {PlayerCarKeys.image: b64encode(binary_data),
            PlayerCarKeys.name: name,
            PlayerCarKeys.luck: luk,
            PlayerCarKeys.instruction: text_car_status}


@router.get("/test/car/create/status")
async def test_make_car_status(input_text_model:InputTextModel = Depends(),api_key: str = Security(validate_api_key)):


    text_en = translation(input_text_model.text_user_input,'JA','EN-US')

    [luk,name,text_car_status] = await status_generate_chatgpt(text_en)
    
    text_jp = translation(text_car_status,'EN','JA')

    return {"name": name,"luk": luk,"text_car_status": text_jp}


