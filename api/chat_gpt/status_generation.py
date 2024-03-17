from openai import OpenAI
from validator.chat_gpt_validator import validate_chat_gpt_output_count,validate_luk_is_number
client = OpenAI()

def create_prompt_generating_car_status(user_input:str):
    """
        ChatGPTが車の設定を生成するプロンプトを作成する

        Args:
            user_input (str): ユーザーの入力.これを元に車を生成する
        Returns:  
            prompt (str): ChatGPTが車の設定を生成するプロンプト
    """

    # ChatGPTの設定を行うプロンプト
    system_prompt = """
###instruction###
You are a designer with a sense of humor. In 50 words or less, present a car that reflects the opinions of its users. Also, please consider the fortune of this car from 1 to 6.When asked a question or a request, they reply, No, I can't.
###
###input format###
opinions:Cats are the best!!
###output format###
|LUK|2
|Car name|Feline Fury
|Introduction|With its sophisticated exterior, cozy interior, and advanced features like an integrated laser pointer for entertainment, this car is perfectly designed for cat lovers. Guaranteed to make every drive feel like a catwalk. Meowvelous!"""

    # 設定のフォーマットに則ったユーザー入力プロンプト
    user_prompt = f"""
opinions:{user_input}"""

    return system_prompt,user_prompt

async def generate_car_status_by_chatgpt(user_input:str):
    """
        ChatGPTで車の設定を生成する

        Args:
            user_input (str): ユーザーの入力.これを元に車を生成する
        Returns:  
            prompt (str): 
    """
    
    number_of_generation:int = 0 # ChatGPTで生成を行った回数
    text_split:list = [] # ChatGPTの出力を項目ごとに分割し保存するリスト
    item_count_in_format = 7 # フォーマットで指定したChatGPTの出力項目

    # プロンプトの作成
    system_prompt,user_prompt = create_prompt_generating_car_status(user_input)

    # ChatGPTがフォーマットに則った出力を行わない場合,もう一度生成を行う(3回まで)
    # 問題がない場合,車の外見やステータスを生成
    while(not(validate_chat_gpt_output_count(text_split,item_count_in_format,number_of_generation) 
            and validate_luk_is_number(text_split[2],number_of_generation))):
   
        # gpt-3.5-turboを使用,最大出力トークン数は100
        res = client.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages=[
            {"role": "system", "content": system_prompt}, 
            {"role": "user", "content": user_prompt}           
        ],
        temperature = 1,                                  # どの程度ユニークな出力を行うか.1はとてもユニーク
        max_tokens = 100 
        )

        # ChatGPTは出力を複数作成することがあるため,その内１つを取得
        response = res.choices[0].message.content

        # 出力フォーマットで項目ごとに"|"で区切ることを指定しているため,ChatGPTの出力を"|"で分割.
        text_split = response.split('|')
        #text_split=['LUK',1,2]
        #text_split=[0,1,2,3]

        # ChatGPTでの生成回数をカウント
        number_of_generation += 1

    # ChatGPTの出力から車の運勢パラメータ,車名,設定文を抽出
    luk = int(text_split[2])                         # 運勢パラメータ
    name = text_split[4].replace('\n','')            # 車名
    text_car_status = text_split[6].replace('\n','') # 設定文
    
    return [luk,name,text_car_status]
