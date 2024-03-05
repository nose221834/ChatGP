from openai import OpenAI
from fastapi.responses import Response
import requests
import base64

client = OpenAI()

def shaping_prompts_car_img(text:str):

    prompt="Draw a single car with a design based on the specified theme.#Theme# "+ text + " #Condition 1# Background is white. #Condition 2# The outline of the car is highlighted in black. #Condition 3# The theme must be reflected in the car's design, colors and decorations. For example, if the theme is [Cats are God!] then the car should include features and details that are reminiscent of cats (e.g., cat ears and tail shape, cat hair pattern design, etc.). However, the theme is not limited to this example, and the car design should be modified according to the theme. #Condition 4# Please depict only one car clearly, with no other objects displayed in the background."
    return prompt


#dall-e-2は使い物にならないので本番はdall-e-3を使用
async def image_generate_chatgpt(text:str):
    
    text_prompt = shaping_prompts_car_img(text)

    #modelはdell-e2
    response =  client.images.generate(
                        model   = "dall-e-2",   # モデル  
                        prompt  = text_prompt,         # 画像生成に用いる説明文章         
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
