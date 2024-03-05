from openai import OpenAI

client = OpenAI()

#dall-e-2は使い物にならないので本番はdall-e-3を使用

def shaping_prompts_car_img(text:str):

    prompt="Draw a single car with a design based on the specified theme.#Theme# "+ text + " #Condition 1# Background is white. #Condition 2# The outline of the car is highlighted in black. #Condition 3# The theme must be reflected in the car's design, colors and decorations. For example, if the theme is [Cats are God!] then the car should include features and details that are reminiscent of cats (e.g., cat ears and tail shape, cat hair pattern design, etc.). However, the theme is not limited to this example, and the car design should be modified according to the theme. #Condition 4# Please depict only one car clearly, with no other objects displayed in the background."
    return prompt

async def image_generate_chatgpt(text:str):
    
    text_prompt = shaping_prompts_car_img(text)
    #modelはdell-e2
    response =  client.images.generate(
                        model   = "dall-e-3",   # モデル  
                        prompt  = text_prompt,         # 画像生成に用いる説明文章         
                        n       = 1,            # 何枚の画像を生成するか  
                        size="1024x1024",
                        quality="standard",
                    )
    
    image_url = response.data[0].url

    # 画像をローカルに保存
    #car_img_binary = requests.get(image_url).content
    
    #car_img_binaryはバイナリー
    #with open("test_img.png", "wb") as f:
    #    f.write(car_img_binary)
    
    return image_url 



"""
res = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "あなたは賢いAIです。"},  # 役割設定（省略可）
        {"role": "user", "content": "1たす1は？"}               # 最初の質問
    ],
    temperature=1  # 温度（0-2, デフォルト1）
)

print(res.choices[0].message.content)  # 答えが返る
"""