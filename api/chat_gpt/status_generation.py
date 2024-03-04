from openai import OpenAI

client = OpenAI()


async def status_generate_chatgpt(text:str):


    res = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content":"You are a designer with a sense of humor. Introduce a fictional car that reflects the opinions of its users. Also, determine the LUK of the driver of this car from 0 to 6. Please do not mention LUK in the text.#Format#.[LUK,NAME,TEXT]"},  
        {"role": "user", "content": text}               
    ],
    temperature=1,
    max_tokens = 50
    )

    return res.choices[0].message.content