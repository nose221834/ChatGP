from openai import OpenAI
from chat_gpt.chat_gpt_validator import validate_chat_gpt_output_count,validate_luk_is_number
client = OpenAI()

def shaping_prompts_status_generate(user_input:str):
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

    user_prompt = f"""
opinions:{user_input}"""

    return system_prompt,user_prompt

async def status_generate_chatgpt(user_input:str):

    number_of_generation:int = 0
    text_split:list = []
    item_count_in_format = 7

    system_prompt,user_prompt = shaping_prompts_status_generate(user_input)

    while(not(validate_chat_gpt_output_count(text_split,item_count_in_format,number_of_generation) 
            and validate_luk_is_number(text_split[2],number_of_generation))):

        res = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},  
            {"role": "user", "content": user_prompt}               
        ],
        temperature=1,
        max_tokens = 100
        )
        response = res.choices[0].message.content
        text_split = response.split('|')
        #text_split=['LUK',1,2]
        #text_split=[0,1,2,3]
        number_of_generation += 1

    luk = int(text_split[2])
    name = text_split[4].replace('\n','')
    text_car_status = text_split[6].replace('\n','')
    return [luk,name,text_car_status]
