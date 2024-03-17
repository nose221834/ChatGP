from fastapi import APIRouter, Security,Depends
from fastapi.responses import Response
from chat_gpt.status_generation import generate_car_status_by_chatgpt
from utils.translation import translation
from utils.auth import validate_api_key
from transformers import GPT2Tokenizer
from base64 import b64encode
from validator.chat_gpt_validator import validate_token_count
from openai import OpenAI
import asyncio
import requests
from config import PlayerCarKeys
from models import InputTextModel
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

router = APIRouter()

client = OpenAI()

@router.get("/car/create")
async def generate_car_by_chatgpt(input_text_model:InputTextModel = Depends(),api_key: str = Security(validate_api_key)):
    """
    動作確認の際に,chat_gpt/car_data.pyの代わりに使用するAPI.
    rembg(背景透過ライブラリ)を使用していない .

    Args:  
        text_inputted_user (str): ユーザーの入力  
    Returns:  
        player_car_image (bytes): 生成された車画像のバイナリー  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文  

    """

    # ChatGPTの入力は日本語より英語の方がトークン数を抑えれるため,DeepLで英語に翻訳.(DeepL APIは無料)
    text_inputted_user = translation(input_text_model.text_inputted_user,'JA','EN-US')
    
    # ユーザー入力が入力トークン数の上限(5トークン)を上回っていないか検証
    # 問題がない場合,ChatGPTで車の画像とステータスを生成
    if validate_token_count(text_inputted_user,5):
        url_car_img, [player_luck,car_name,text_car_status] = await asyncio.gather(
            generate_car_img_by_chatgpt_no_rembg(text_inputted_user),
            generate_car_status_by_chatgpt(text_inputted_user)
        )

    # ChatGPTの出力(英語)を日本語に翻訳
    text_jp = translation(text_car_status,'EN','JA')


    return {PlayerCarKeys.image: url_car_img,
            PlayerCarKeys.car_name: car_name,
            PlayerCarKeys.luck: player_luck,
            PlayerCarKeys.instruction: text_jp}

def create_prompt_generating_car_img(text_inputted_user:str):
    """
    ユーザー入力をChatGPTに入力するプロンプトに整形

    Args:  
        text (str): ユーザーの入力  
    Returns:  
        prompt (str): ChatGPTに入力する文章
    """

    prompt="Draw a single car with a design based on the specified theme.#Theme# "+ text_inputted_user + " #Condition 1# Background is white. #Condition 2# The outline of the car is highlighted in black. #Condition 3# The theme must be reflected in the car's design, colors and decorations. For example, if the theme is [Cats are God!] then the car should include features and details that are reminiscent of cats (e.g., cat ears and tail shape, cat hair pattern design, etc.). However, the theme is not limited to this example, and the car design should be modified according to the theme. #Condition 4# Please depict only one car clearly, with no other objects displayed in the background."
    
    return prompt


async def generate_car_img_by_chatgpt_no_rembg(text_inputted_user:str):

    """
    動作確認の際に,chat_gpt/car_data.pyの代わりに使用するAPI.
    rembg(背景透過ライブラリ)を使用していない .

    Args:  
        text_inputted_user (str): ユーザーの入力  
    Returns:  
        player_car_image (bytes): 生成された車画像のバイナリー  
        player_car_name (str): 生成された車の名前  
        player_car_luck (int): 生成された車の運勢パラメータ  
        player_car_instruction (str): 生成された車の紹介文  

    """

    # ユーザー入力をChatGPTに入力するプロンプトに整形
    text_prompt = create_prompt_generating_car_img(text_inputted_user)

    # dell-e2モデルで256x256の画像を１枚生成
    response =  client.images.generate(
                        model   = "dall-e-2",    
                        prompt  = text_prompt,         
                        n       = 1,
                        #size="1024x1024",
                        size="256x256", 
                        quality="standard",
                    )

    # ChatGPTが生成した画像をバイナリーで取得
    url_car_img = response.data[0].url
    car_img_binary = requests.get(url_car_img).content
    
    
    return b64encode(car_img_binary) # 画像(バイナリ)をbase64に変換して返す
