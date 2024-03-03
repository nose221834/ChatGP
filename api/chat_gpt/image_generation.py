from openai import OpenAI

client = OpenAI()

#dall-e-2は使い物にならないので本番はdall-e-3を使用
def image_generate_chatgpt(text:str):
    
    #modelはdell-e2
    response =  client.images.generate(
                        model   = "dall-e-2",   # モデル  
                        prompt  = text,         # 画像生成に用いる説明文章         
                        n       = 1,            # 何枚の画像を生成するか  
                        size="512x512",
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