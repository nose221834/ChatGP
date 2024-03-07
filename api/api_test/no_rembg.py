from fastapi import APIRouter, Security
from fastapi.responses import Response
from chat_gpt.status_generation import status_generate_chatgpt
from utils.translation import translation
from utils.auth import validate_api_key
from transformers import GPT2Tokenizer
from base64 import b64encode
from chat_gpt.car_data_validator import validate_token_count
from openai import OpenAI
import asyncio
import requests

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

router = APIRouter()

client = OpenAI()

@router.get("/{player}/car/data")
async def make_car(player: str,text: str, api_key: str = Security(validate_api_key)):

    text_en = translation(text,'JA','EN-US')
    
    if validate_token_count(text_en,5):
        url_car_img, [luk,name,text_car_status] = await asyncio.gather(
            image_generate_chatgpt_no_rembg(text_en),
            status_generate_chatgpt(text_en)
        )

    
    text_jp = translation(text_car_status,'EN','JA')


    return {"url_car_img": url_car_img,"name": name,"luk": luk,"text_car_status": text_jp}

def shaping_prompts_car_img(text:str):

    prompt="Draw a single car with a design based on the specified theme.#Theme# "+ text + " #Condition 1# Background is white. #Condition 2# The outline of the car is highlighted in black. #Condition 3# The theme must be reflected in the car's design, colors and decorations. For example, if the theme is [Cats are God!] then the car should include features and details that are reminiscent of cats (e.g., cat ears and tail shape, cat hair pattern design, etc.). However, the theme is not limited to this example, and the car design should be modified according to the theme. #Condition 4# Please depict only one car clearly, with no other objects displayed in the background."
    return prompt


async def image_generate_chatgpt_no_rembg(text:str):
    
    text_prompt = shaping_prompts_car_img(text)
    #modelはdell-e2
    response =  client.images.generate(
                        model   = "dall-e-2",   # モデル  
                        prompt  = text_prompt,         # 画像生成に用いる説明文章         
                        n       = 1,            # 何枚の画像を生成するか  
                        #size="1024x1024",
                        size="256x256",
                        quality="standard",
                    )
    
    image_url = response.data[0].url

    # URLから画像(バイナリ)を取得
    car_img_binary = requests.get(image_url).content
    
    
    return b64encode(car_img_binary) # 画像(バイナリ)をbase64に変換して返す
