from fastapi import APIRouter, Security
from fastapi.responses import Response
from utils.auth import validate_api_key

from utils.translation import translation
from chat_gpt.chat_gpt_validator import validate_token_count
from chat_gpt.race_progresstion import race_moderator_chatgpt

router = APIRouter()

@router.get("/{player}/race")
def make_car(player: str,first_car_name:str,second_car_name:str,third_car_name:str,fourth_car_name:str,player_car_name:str,
                first_car_introduction:str,second_car_introduction:str,third_car_introduction:str,fourth_car_introduction:str,
                event:str,api_key: str = Security(validate_api_key)):

    text_en = translation(event,'JA','EN-US')
    
    if validate_token_count(text_en,30):
        result_text,first,second,third,fourth = race_moderator_chatgpt(first_car_name,second_car_name,third_car_name,fourth_car_name,player_car_name,
                first_car_introduction,second_car_introduction,third_car_introduction,fourth_car_introduction,text_en)

    result_text_jp = translation(result_text,'EN','JA')


    return {"result_text": result_text_jp,"first": first,"second": second,"third": third,"fourth":fourth}
