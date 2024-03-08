from fastapi import APIRouter, Security
from utils.auth import validate_api_key
from utils.translation import translation
from chat_gpt.chat_gpt_validator import validate_token_count
from chat_gpt.race_progression import race_moderator_chatgpt
from chat_gpt.ending_generation import ending_generate_chatgpt
from models import RaceModeratorModel
from config import RaceInfoKeys

router = APIRouter()

class GameEndingModel(RaceModeratorModel):
    player_car_profile:str
    player_luck:int

@router.post("/{player}/race/ending")
def output_game_ending(ending_model:GameEndingModel,api_key: str = Security(validate_api_key)):
    
    text_en = "The goal is in sight!" + translation(ending_model.event,'JA','EN-US')
    ending_model.event = text_en

    if validate_token_count(text_en,35):

        text_result,first,second,third,fourth = race_moderator_chatgpt(ending_model)
        
        ending_text = ending_generate_chatgpt(ending_model,text_result,first,second,third,fourth)

    print(ending_text)
    ending_text_jp = translation(ending_text ,'EN','JA')


    return {RaceInfoKeys.generated_text: ending_text_jp,
            RaceInfoKeys.first_place: first,
            RaceInfoKeys.second_place: second,
            RaceInfoKeys.third_place: third,
            RaceInfoKeys.fourth_place:fourth}