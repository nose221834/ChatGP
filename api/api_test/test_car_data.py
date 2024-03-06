from fastapi import APIRouter, Security
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from utils.auth import validate_api_key
from transformers import GPT2Tokenizer
from PIL import Image
from rembg import remove
from io import BytesIO
from base64 import b64encode

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

router = APIRouter()


@router.get("/{player}/car/data")
def test_make_car(player: str,text: str, api_key: str = Security(validate_api_key)):

    img_bin_path = "api_test/gpt_car.bin"
    img = Image.open(img_bin_path)
    output = remove(img)
    buffered = BytesIO()
    output.save(buffered, format="PNG")  # 任意のフォーマットを選択してください (JPEG, PNG, BMP, etc.)
    binary_data = buffered.getvalue()
    
    name = 'Feline Fury'
    luk = '4'
    text_car_status = '洗練されたエクステリア、居心地の良いインテリア、そしてエンターテイメント用の内蔵レーザーポインターなどの先進機能で、この車は猫愛好家のために完璧にデザインされている。すべてのドライブがキャットウォークのように感じられること請け合いだ。ニャーベラス！'
    
    return {"car_img": b64encode(binary_data),"name": name,"luk": luk,"text_car_status": text_car_status}

"""

@router.get("/{player}/car/data")
def test_make_car_no_rembg(player: str,text: str, api_key: str = Security(validate_api_key)):


    with open("api_test/gpt_car.bin","rb") as f:
       binary_data = f.read()
    
    name = 'Feline Fury'
    luk = '4'
    text_car_status = '洗練されたエクステリア、居心地の良いインテリア、そしてエンターテイメント用の内蔵レーザーポインターなどの先進機能で、この車は猫愛好家のために完璧にデザインされている。すべてのドライブがキャットウォークのように感じられること請け合いだ。ニャーベラス！'
    
    return {"car_img": b64encode(binary_data),"name": name,"luk": luk,"text_car_status": text_car_status}
"""

@router.get("/test/car/status")
async def test_make_car_status(text: str, api_key: str = Security(validate_api_key)):


    text_en = translation(text,'JA','EN-US')

    [luk,name,text_car_status] = await status_generate_chatgpt(text_en)
    
    text_jp = translation(text_car_status,'EN','JA')

    return {"name": name,"luk": luk,"text_car_status": text_jp}


