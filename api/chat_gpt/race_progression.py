from openai import OpenAI
from validator.chat_gpt_validator import validate_chat_gpt_output_count
from models import RaceModeratorModel


client = OpenAI()

def shaping_prompts_rece_moderator(ending_model:RaceModeratorModel):

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

    prompt_user = f"""
**race position**
|1th|{ending_model.first_car_name}
|2nd|{ending_model.second_car_name}
|3rd|{ending_model.third_car_name}
|4th|{ending_model.fourth_car_name}
|event|Actions of {ending_model.player_car_name}:{ending_model.event}"""

    return prompt_system,prompt_user


def race_moderator_chatgpt(ending_model:RaceModeratorModel):

    text_split:list = []
    number_of_generation:int = 0
    item_count_in_format = 11

    while(not(validate_chat_gpt_output_count(text_split,item_count_in_format,number_of_generation))): 
        prompt_system,prompt_user = shaping_prompts_rece_moderator(ending_model)

        res = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
                "content":prompt_system},  
                {"role": "user", "content": prompt_user}               
            ],
        temperature=1,
        max_tokens = 200
        )
        response = res.choices[0].message.content
        text_split = response.split('|')
        #text_split=[i for i in range(8)]
        number_of_generation += 1

    first = text_split[2].replace('\n','')
    second = text_split[4].replace('\n','')
    third = text_split[6].replace('\n','')
    fourth = text_split[8].replace('\n','')
    result_text = text_split[10].replace('\n','')
    
    return result_text,first,second,third,fourth