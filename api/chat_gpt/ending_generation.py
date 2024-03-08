from openai import OpenAI
from models import RaceModeratorModel
from chat_gpt.chat_gpt_validator import validate_chat_gpt_output_count
import random

client = OpenAI()

def determine_player_luck(player_luck:int):

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

def shaping_prompts_ending_generate(text_rust_event:str,first_car_name:str,second_car_name:str,third_car_name:str,fourth_car_name:str,player_car_name:str,player_car_profile:str,player_luck:int):

    player_destiny = determine_player_luck(player_luck)

    prompt_system = f"""

You are a unique scenario writer.
This time, I'd like you to write an ending scenario for a race with {player_car_name} as the protagonist in 300 to 400 words.
I'll provide you with the names of the four cars that participated, profile of {player_car_name}, the event that occurred just before the finish line, and the final standings. 
Please write a story of about 200 words describing {player_car_name} just before reaching the finish line and the moment of reaching the finish line, and then write another story of about 200 words about {player_car_name}s achievements after the race.
###profile of {player_car_name}###
car_name:{player_car_name}
introduction:{player_car_profile}

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

    prompt_user = f"""
**race position**
**finishing position**
|1th|{second_car_name}
|2nd|{third_car_name}
|3rd|{first_car_name}
|4th|{fourth_car_name}
|event|Actions of {first_car_name}:{text_rust_event} {player_destiny}"""


    return prompt_system,prompt_user

def ending_generate_chatgpt(race_moderate:RaceModeratorModel,text_rust_event:str,first_car_name:str,second_car_name:str,third_car_name:str,fourth_car_name:str):

    number_of_generation:int = 0
    text_split:list = []
    item_count_in_format = 3
    
    system_prompt,user_prompt = shaping_prompts_ending_generate(text_rust_event,first_car_name,second_car_name,third_car_name,fourth_car_name,race_moderate.player_car_name,race_moderate.player_car_profile,race_moderate.player_luck)

    while(not(validate_chat_gpt_output_count(text_split,item_count_in_format,number_of_generation))):

        res = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},  
            {"role": "user", "content": user_prompt}               
        ],
        temperature=1,
        max_tokens = 300
        )
        response = res.choices[0].message.content
        text_split = response.split('|')
        #text_split=['LUK',1,2]
        #text_split=[0,1,2,3]
        number_of_generation += 1

    text_ending = text_split[2].replace('\n','')
    return text_ending

