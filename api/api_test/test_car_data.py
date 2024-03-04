from fastapi import APIRouter
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from transformers import GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

router = APIRouter()


@router.get("/{player}/car/data")
def test_make_car(player: str,text: str):

    text_en = translation(text,'JA','EN-US')
    url_car_img = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-y5P3NCasK6owz2i1QKJgoZE4/user-186u1BiO0TtcSyxtmsx4kDoQ/img-ZCC8FVOhwygv6RinNM43AWAb.png?st=2024-03-03T10%3A34%3A39Z&se=2024-03-03T12%3A34%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-02T13%3A33%3A29Z&ske=2024-03-03T13%3A33%3A29Z&sks=b&skv=2021-08-06&sig=MiyccbiSffSb2Y1hvj%2B7p0RIyjMll4wlrY016bCJnMc%3D'
    name = 'Feline Fury'
    luk = '4'
    text_car_status = 'This car is purrfectly designed for cat enthusiasts with its sleek exterior, cozy interior, and advanced features like a built-in laser pointer for entertainment. Guaranteed to make every ride feel like a catwalk. Meowvelous!'
    
    return {"url_car_img": url_car_img,"name": name,"luk": luk,"text_car_status": text_car_status}


@router.get("/test/car/status")
async def test_make_car_status(text: str):

    text_en = translation(text,'JA','EN-US')

    [luk,name,text_car_status] = await status_generate_chatgpt(text_en)

    return {"name": name,"luk": luk,"text_car_status": text_car_status}


