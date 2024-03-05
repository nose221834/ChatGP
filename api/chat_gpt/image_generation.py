from openai import OpenAI
import requests
from PIL import Image
from io import BytesIO
from rembg import remove
from base64 import b64encode

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

    # URLから画像(バイナリ)を取得
    car_img_binary = requests.get(image_url).content
    
    image = Image.open(BytesIO(car_img_binary)) # 画像(バイナリ)をImageに変換
    removebg_image = remove(image) # 背景を透過した画像に変換
    buffered = BytesIO()
    removebg_image.save(buffered, format="PNG") 
    binary_image = buffered.getvalue() # 画像(バイナリ)を取得
    
    return b64encode(binary_image) # 画像(バイナリ)をbase64に変換して返す



"""
res = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "あなたは賢いAIです。"},  # 役割設定（省略可）
        {"role": "user", "content": "1たす1は？"}               # 最初の質問
    ],
    temperature=1  # 温度（0-2, デフォルト1）
)

print(res.choices[0].message.content)  # 答えが返る
"""