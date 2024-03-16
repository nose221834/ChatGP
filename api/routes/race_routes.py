from fastapi import APIRouter, Security
from utils.auth import validate_api_key
from models import RaceModeratorModel
from utils.translation import translation
from validator.chat_gpt_validator import validate_token_count
from chat_gpt.race_progression import race_moderator_chatgpt
from config import RaceInfoKeys
router = APIRouter()

@router.post("/race/middle_part")
def output_race_progress(race_moderate:RaceModeratorModel,api_key: str = Security(validate_api_key)):
    """    
    Args:  
        race_moderate (RaceModeratorModel):レースに参加している車の情報
        api_key (str): APIにアクセスするために必要なセキュリティーキー

    Returns:  
        generated_text (str):ユーザー入力を元に生成されたシナリオ  
        first_place (str):１位の車名  
        second_place (str):２位の車名  
        third_place (str):３位の車名  
        fourth_prace (str):４位の車名

    Raises:
        HTTP_408_REQUEST_TIMEOUT: ChatGPTの出力がフォーマットに則っていない
        HTTP_400_BAD_REQUEST: ユーザーの入力がトークンの上限を超えた.
    """
    # ユーザーの入力(イベント)を英語に翻訳
    race_moderate.event = translation(race_moderate.event,'JA','EN-US')
    
    # 入力トークンが上限(30トークン)を超えていないかチェック
    # 問題がない場合,ChatGPTを用いて,ユーザーの入力を元にゲームのシナリオを作成
    if validate_token_count(race_moderate.event,30):
        result_text,first,second,third,fourth = race_moderator_chatgpt(race_moderate)

    # ユーザーの入力(イベント)を日本語に翻訳
    result_text_jp = translation(result_text,'EN','JA')


    return {RaceInfoKeys.generated_text: result_text_jp,
            RaceInfoKeys.first_place: first,
            RaceInfoKeys.second_place: second,
            RaceInfoKeys.third_place: third,
            RaceInfoKeys.fourth_place:fourth}
