from pydantic import BaseModel
from typing import Optional
from fastapi import  HTTPException,status
class RaceModeratorModel(BaseModel):
    first_car_name:str
    second_car_name:str
    third_car_name:str
    fourth_car_name:str
    player_car_name:str
    first_car_introduction:str
    second_car_introduction:str
    third_car_introduction:str
    fourth_car_introduction:str
    event:str

    def __init__(self, **data):
        super().__init__(**data)
        

class GameEndingModel(RaceModeratorModel):
    player_car_introduction:Optional[str] = 'default'
    player_luck:int

    def __init__(self, **data):
        super().__init__(**data)  # 基底クラスのコンストラクタを呼び出す

        #player_car_introductionを検索し,自動で設定
        car_introductions = {
            self.first_car_name: self.first_car_introduction,
            self.second_car_name: self.second_car_introduction,
            self.third_car_name: self.third_car_introduction,
            self.fourth_car_name: self.fourth_car_introduction
        }
        if self.player_car_name not in car_introductions:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Player's car, {self.player_car_name}, is not found.")

        # player_carの紹介文を取得
        self.player_car_introduction = car_introductions.get(self.player_car_name, "Player's car is not listed.")