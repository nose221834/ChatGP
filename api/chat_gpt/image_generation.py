from openai import OpenAI
import requests
from base64 import b64encode
from utils.remove_bg import remove_background
from utils.reverse_image import reverse_image
from utils.save_image import save_image # 生成された画像を確認するために用いる。本番では不要
from pathlib import Path

client = OpenAI()

#dall-e-2は使い物にならないので本番はdall-e-3を使用

def shaping_prompts_car_img(text:str):

    prompt = f"""
You are a unique designer. Draw one car with a design based on a specified theme.

###Theme###
{text} 

###Condition 1###
Background is white. 

###Condition 2###
The outline of the car is highlighted in black.

###Condition 3###
The theme must be reflected in the car's design, colors and decorations. For example, if the theme is [Cats are God!] then the car should include features and details that are reminiscent of cats (e.g., cat ears and tail shape, cat hair pattern design, etc.). However, the theme is not limited to this example, and the car design should be modified according to the theme.

###Condition 4### 
Only one car must be depicted clearly, with no other objects or text in the background."""

    return prompt


async def image_generate_chatgpt(text:str):
    
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
    car_img_binary: bytes = requests.get(image_url).content

    # 画像を保存
    image_output_dir = Path("tmp/img")
    image_output_dir.mkdir(exist_ok=True, parents=True)
    image_file_name = "generated.png"
    save_image(car_img_binary, image_output_dir / image_file_name) # 生成された画像を確認するために用いる。本番では不要

    remove_bg_binary: bytes = remove_background(car_img_binary) # 画像の背景を透過する

    reverse_binary: bytes = reverse_image(remove_bg_binary) # 画像を反転する
    
    return b64encode(reverse_binary) # 画像(バイナリ)をbase64に変換して返す


