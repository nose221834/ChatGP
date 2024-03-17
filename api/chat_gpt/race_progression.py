from openai import OpenAI
from validator.chat_gpt_validator import validate_chat_gpt_output_count
from models import RaceModeratorModel


client = OpenAI()

def create_prompt_generating_race_scenario(ending_model:RaceModeratorModel):
    """
        ChatGPTにレースのシナリオを生成させるプロンプトを作成

        Args:
            ending_model (RaceModeratorModel):レースに参加している車の情報
        Returns:  
            prompt (str): ChatGPTがレースの進行を行うためのプロンプト
    """

    # ChatGPTの設定を行うプロンプト
    prompt_system = f"""
You are the live commentator for the Race Cup.
You will give the names of the four participating cars, their current standings and the events that have occurred.
Predict the outcome of the event and any changes in the standings and output them according to the format.

###car_data###
car_name:{ending_model.second_car_name}
instruction:{ending_model.second_car_instruction}

car_name:{ending_model.fourth_car_name}
car_instruction:{ending_model.fourth_car_instruction}

car_name:{ending_model.first_car_name}
car_instruction:{ending_model.first_car_instruction}

car_name:{ending_model.third_car_name}
car_instruction:{ending_model.third_car_instruction}

###input format###
**race position**
|1th|{ending_model.second_car_name}
|2nd|{ending_model.third_car_name}
|3rd|{ending_model.first_car_name}
|4th|{ending_model.fourth_car_name}
|event|Actions of {ending_model.first_car_name}:I'm going to crash into the car in front of me by accelerating!

###event###
{ending_model.first_car_name} just rammed into the car in front!

###output format###
|1th|{ending_model.second_car_name}
|2nd|{ending_model.first_car_name}
|3rd|{ending_model.third_car_name}
|4th|{ending_model.fourth_car_name}
|result|Oops! {ending_model.first_car_name} hit the car in front of him! What a wild ride! {ending_model.first_car_name} in front of him spun wide!"""

    # 設定のフォーマットに則ったユーザー入力プロンプト
    prompt_user = f"""
**race position**
|1th|{ending_model.first_car_name}
|2nd|{ending_model.second_car_name}
|3rd|{ending_model.third_car_name}
|4th|{ending_model.fourth_car_name}
|event|Actions of {ending_model.player_car_name}:{ending_model.event}"""

    return prompt_system,prompt_user



def generate_race_scenario(ending_model:RaceModeratorModel):
    """
        ChatGPTがユーザーの入力を受け取り,その入力を元にシナリオを作成する

        Args:
            ending_model (RaceModeratorModel):レースに参加している車の情報
        Returns:  
            result_text (str): ChatGPTが生成したシナリオ文
            first (str): １位の車名
            second (str): ２位の車名
            third (str): ３位の車名
            fourth (str): ４位の車名
    """

    number_of_generation:int = 0 # ChatGPTで生成を行った回数
    text_split:list = [] # ChatGPTの出力を項目ごとに分割し保存するリスト
    item_count_in_format:int = 11 # フォーマットで指定したChatGPTの出力項目

    # ChatGPTがフォーマットに則った出力を行わない場合,もう一度生成を行う(3回まで)
    # 問題がない場合レースのシナリオを生成する
    while(not(validate_chat_gpt_output_count(text_split,item_count_in_format,number_of_generation))): 
        prompt_system,prompt_user = create_prompt_generating_race_scenario(ending_model)

        # gpt-3.5-turboを使用,最大出力トークン数は200
        res = client.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages=[
            {"role": "system","content":prompt_system}, 
            {"role": "user", "content": prompt_user}         
            ],
        temperature = 1, # どの程度ユニークな出力を行うか.1はとてもユニーク
        max_tokens = 200  
        )

        # ChatGPTは出力を複数作成することがあるため,その内１つを取得
        response = res.choices[0].message.content  

        # 出力フォーマットで項目ごとに"|"で区切ることを指定しているため,ChatGPTの出力を"|"で分割.
        text_split = response.split('|')
        #text_split=[i for i in range(8)]

        # ChatGPTでの生成回数をカウント
        number_of_generation += 1

    # ChatGPTの出力から順位とイベントを抽出
    first = text_split[2].replace('\n','')
    second = text_split[4].replace('\n','')
    third = text_split[6].replace('\n','')
    fourth = text_split[8].replace('\n','')
    result_text = text_split[10].replace('\n','')
    
    return result_text,first,second,third,fourth