from fastapi import APIRouter, Security
from utils.auth import validate_api_key
from models import RaceModeratorModel
from utils.translation import translation
from chat_gpt.chat_gpt_validator import validate_token_count
from chat_gpt.race_progression import race_moderator_chatgpt
from config import RaceInfoKeys
router = APIRouter()

@router.post("/race")
def output_race_progress(race_moderate:RaceModeratorModel,api_key: str = Security(validate_api_key)):

    race_moderate.event = translation(race_moderate.event,'JA','EN-US')
    
    if validate_token_count(race_moderate.event,30):
        result_text,first,second,third,fourth = race_moderator_chatgpt(race_moderate)

    result_text_jp = translation(result_text,'EN','JA')


    return {RaceInfoKeys.generated_text: result_text_jp,
            RaceInfoKeys.first_place: first,
            RaceInfoKeys.second_place: second,
            RaceInfoKeys.third_place: third,
            RaceInfoKeys.fourth_place:fourth}
