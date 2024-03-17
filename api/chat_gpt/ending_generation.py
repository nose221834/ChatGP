from openai import OpenAI
from models import GameEndingModel
from validator.chat_gpt_validator import ChatgptOutputValidator
import random

client = OpenAI()

def pick_event_by_player_luck(player_luck:int):
    """
        player_luckの値を元に発生するイベントを抽選 
    Args:  
        player_luck (int): ユーザーの入力(日本語) 
    Returns:  
        en_text (str): 英語に翻訳後のテキスト
    """

    # player_luckの値を元に,発生するイベントを抽選.こののイベントをどう解釈するかはChatGPT次第
    luck_value = player_luck * random.randint(1, 6)

    if luck_value > 31:
        player_destiny = "しかし不幸なことに...."
    elif luck_value > 21:
        player_destiny = "効果はあまりなかった"
    elif luck_value > 6:
        player_destiny = "幸運なことに"
    else:
        player_destiny = "効果は絶大だ！"

    return player_destiny

def shaping_prompts_ending_generate(text_rust_event:str,first_car_name:str,second_car_name:str,third_car_name:str,
                                        fourth_car_name:str,player_car_name:str,player_car_instruction:str,player_luck:int):
    """
        ChatGPTがエンディングを生成するプロンプトを作成する

        Args:
            text_rust_event (str): 最終ラップでのユーザー入力  
            first_car_name (str): １位の車名  
            second_car_name (str): ２位の車名  
            third_car_name (str): ３位の車名  
            fourth_car_name (str): ４位の車名  
            player_car_name (str): プレーヤーの車の名前  
            player_car_instruction (str): プレイヤーの車の詳細
            player_luck (int): プレイヤーの運勢パラメータ 
        Returns:  
            prompt_system (str): ChatGPTの設定を行うプロンプト
            prompt_user (str): 設定のフォーマットに則った入力プロンプト
    """
    # player_luckの値を元に,発生するイベントを抽選
    player_destiny = pick_event_by_player_luck(player_luck)

    # ChatGPTの設定を行うプロンプト
    prompt_system = f"""

You are a unique scenario writer.
This time, I'd like you to write an ending scenario for a race with {player_car_name} as the protagonist in 300 to 400 words.
I'll provide you with the names of the four cars that participated, profile of {player_car_name}, the event that occurred just before the finish line, and the final standings. 
Please write a story of about 200 words describing {player_car_name} just before reaching the finish line and the moment of reaching the finish line, and then write another story of about 200 words about {player_car_name}s achievements after the race.
###profile of {player_car_name}###
car_name:{player_car_name}
introduction:{player_car_instruction}

###input format###
**finishing position**
|1th|{second_car_name}
|2nd|{third_car_name}
|3rd|{first_car_name}
|4th|{fourth_car_name}
|event|Actions of {first_car_name}:{first_car_name} just rammed into the car in front!But unfortunately...

###output format###
|result|Eager to win, {first_car_name} caught up with the car in front of him, and when they started to run side by side, {first_car_name} started to hit the car from the side. Unfortunately...
"""

    # 設定のフォーマットに則った入力プロンプト
    prompt_user = f"""
**race position**
**finishing position**
|1th|{second_car_name}
|2nd|{third_car_name}
|3rd|{first_car_name}
|4th|{fourth_car_name}
|event|Actions of {first_car_name}:{text_rust_event} {player_destiny}"""


    return prompt_system,prompt_user

def ending_generate_chatgpt(race_moderate:GameEndingModel,text_rust_event:str,first_car_name:str,second_car_name:str,third_car_name:str,fourth_car_name:str):
    """
        ChatGPTでレースのエンディングを生成する

        Args:

            race_moderate (GameEndingModel): レースに出場した車の情報  
            text_rust_event (str): 最終ラップでのユーザー入力 
            first_car_name (str): １位の車名  
            second_car_name (str): ２位の車名  
            third_car_name (str): ３位の車名  
            fourth_car_name (str): ４位の車名  
        Returns:  
            text_ending (str): エンディング文章
    """

    text_split:list = [] # ChatGPTの出力を項目ごとに分割し保存するリスト
    item_count_in_format:int = 3 # フォーマットで指定したChatGPTの出力項目
    
    chatgpt_output_validator = ChatgptOutputValidator()
    
    # プロンプトの作成
    system_prompt,user_prompt = shaping_prompts_ending_generate(text_rust_event,first_car_name,second_car_name,third_car_name,fourth_car_name,race_moderate.player_car_name,race_moderate.player_car_instruction,race_moderate.player_luck)

    # ChatGPTがフォーマットに則った出力を行わない場合,もう一度生成を行う(3回まで)
    # 問題がない場合,ChatGPTでエンディングを生成する.
    while(chatgpt_output_validator.validate_scenario_generated_chatgpt(item_count_in_format,text_split)):

        # gpt-3.5-turboを使用,最大出力トークン数は300
        res = client.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages=[
            {"role": "system", "content": system_prompt}, 
            {"role": "user", "content": user_prompt} 
        ],
        temperature = 1, # どの程度ユニークな出力を行うか.1はとてもユニーク
        max_tokens = 300 
        )

        # ChatGPTは出力を複数作成することがあるため,その内１つを取得
        response = res.choices[0].message.content

        # 出力フォーマットで項目ごとに"|"で区切ることを指定しているため,ChatGPTの出力を"|"で分割.
        text_split = response.split('|')
        #text_split=["a","b","c","d"]

    # ChatGPTの出力からエンディング文の箇所を抽出
    text_ending:str = text_split[2].replace('\n','')

    return text_ending

