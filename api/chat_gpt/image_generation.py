from openai import OpenAI
import requests
from PIL import Image
from io import BytesIO
from rembg import remove
from base64 import b64encode

client = OpenAI()

#dall-e-2は使い物にならないので本番はdall-e-3を使用

def shaping_prompts_car_img(text:str):

    prompt="Draw a single car with a design based on the specified theme.#Theme# "+ text + " #Condition 1# Background is white. #Condition 2# The outline of the car is highlighted in black. #Condition 3# The theme must be reflected in the car's design, colors and decorations. For example, if the theme is [Cats are God!] then the car should include features and details that are reminiscent of cats (e.g., cat ears and tail shape, cat hair pattern design, etc.). However, the theme is not limited to this example, and the car design should be modified according to the theme. #Condition 4# Please depict only one car clearly, with no other objects displayed in the background."
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
    car_img_binary = requests.get(image_url).content
    
    image = Image.open(BytesIO(car_img_binary)) # 画像(バイナリ)をImageに変換
    removebg_image = remove(image) # 背景を透過した画像に変換
    buffered = BytesIO()
    removebg_image.save(buffered, format="PNG") 
    binary_image = buffered.getvalue() # 画像(バイナリ)を取得
    
    return b64encode(binary_image) # 画像(バイナリ)をbase64に変換して返す


