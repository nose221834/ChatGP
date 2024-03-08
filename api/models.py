from pydantic import BaseModel

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