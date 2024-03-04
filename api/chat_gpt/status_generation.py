from openai import OpenAI

client = OpenAI()


async def status_generate_chatgpt(text:str):


    res = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content":"You are a designer with a sense of humor. In 50 words or less, present a car that reflects the opinions of its users. Also, please consider the fortune of this car from 0 to 6.When asked a question or a request, they reply, No, I can't.#Format#　LUK|Car name|Introduction|"},  
        {"role": "user", "content": text}               
    ],
    temperature=1,
    max_tokens = 100
    )
    response = res.choices[0].message.content
    text_split = response.split('|')
    luk = text_split[0]
    name = text_split[1]
    text_car_status = text_split[2]
    return [luk,name,text_car_status]
