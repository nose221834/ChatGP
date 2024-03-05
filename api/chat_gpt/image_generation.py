from openai import OpenAI
from fastapi.responses import Response
import requests
import base64

client = OpenAI()

#dall-e-2は使い物にならないので本番はdall-e-3を使用
async def image_generate_chatgpt(text:str):
    
    #modelはdell-e2
    response =  client.images.generate(
                        model   = "dall-e-2",   # モデル  
                        prompt  = text,         # 画像生成に用いる説明文章         
                        n       = 1,            # 何枚の画像を生成するか  
                        size="512x512",
                        quality="standard",
                    )
    
    image_url = response.data[0].url

    # 画像をローカルに保存
    car_img_binary = requests.get(image_url).content
    
    #car_img_binaryはバイナリー
    #with open("test_img.bin", "wb") as f:
    #   f.write(car_img_binary)
    
    return base64.b64encode(car_img_binary).decode("utf-8")
