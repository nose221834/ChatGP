from pydantic import BaseModel
from typing import Optional
from fastapi import  HTTPException,status,Query

# レースの進行を行うAPIの入力で使用するBaseModel
class RaceModeratorModel(BaseModel):
    first_car_name:str
    second_car_name:str
    third_car_name:str
    fourth_car_name:str
    player_car_name:str
    first_car_instruction:str
    second_car_instruction:str
    third_car_instruction:str
    fourth_car_instruction:str
    event:str

    def __init__(self, **data):
        super().__init__(**data)
        

# エンディングの生成を行うAPIの入力で使用するBaseModel
class GameEndingModel(RaceModeratorModel):
    player_car_instruction:Optional[str] = 'default'
    player_luck:int

    def __init__(self, **data):
        super().__init__(**data)  

        #player_car_instructionを検索し,自動で設定
        car_instructions = {
            self.first_car_name: self.first_car_instruction,
            self.second_car_name: self.second_car_instruction,
            self.third_car_name: self.third_car_instruction,
            self.fourth_car_name: self.fourth_car_instruction
        }
        if self.player_car_name not in car_instructions:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Player's car, {self.player_car_name}, is not found.")

        # player_carの紹介文を取得
        self.player_car_instruction = car_instructions.get(self.player_car_name, "Player's car is not listed.")

# ユーザーからテキストを受け取る際に使用するBaseModel
class InputTextModel(BaseModel):
        text_user_input: str = Query(..., description="ユーザーの入力")
        def __init__(self, **data):
            super().__init__(**data)