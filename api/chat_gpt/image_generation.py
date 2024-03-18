import os
import requests
from openai import OpenAI
from base64 import b64encode
from utils.remove_bg import remove_background
from utils.reverse_image import reverse_image
from utils.save_image import save_image # 生成された画像を確認するために用いる。本番では不要
from pathlib import Path

client = OpenAI()



def shaping_prompts_car_img(text:str):
    """
        ChatGPTが車の画像を生成するプロンプトを作成する

        Args:
            text (str): どんな車がいいのかを指定したユーザー入力.
        Returns:  
            b64encode(reverse_binary) (str): ChatGPTで生成した画像(バイナリ)
    """

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

async def image_generate_chatgpt(text:str,model_chatgpt:str | None,img_size:str):
    """
    ユーザー入力を元に,ChatGPTで車の画像を生成する

    Args:  
        text (str): ユーザーの入力  
    Returns:  
        player_car_image (bytes): 生成された車画像のバイナリー  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文  

    """

    # ChatGPTに入力するプロンプトを作成
    text_prompt = shaping_prompts_car_img(text)


    response =  client.images.generate(
                        model   = model_chatgpt,
                        prompt  = text_prompt,         
                        n       = 1, 
                        size = img_size,
                        quality="standard", 
                    )

    # ChatGPTが生成した画像(バイナリー)を取得
    image_url:str = response.data[0].url
    car_img_binary: bytes = requests.get(image_url).content

    # 画像を保存
    image_output_dir = Path("tmp/img")
    image_output_dir.mkdir(exist_ok=True, parents=True)
    image_file_name = "generated.png"

    # 生成された画像を確認するために用いる。本番では不要
    save_image(car_img_binary, image_output_dir / image_file_name) 

    # 画像の背景を透過する
    remove_bg_binary: bytes = remove_background(car_img_binary) 

    # 画像を反転する
    reverse_binary: bytes = reverse_image(remove_bg_binary) 
    
    return b64encode(reverse_binary) # 画像(バイナリ)をbase64に変換して返す


