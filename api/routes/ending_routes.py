from fastapi import APIRouter, Security
from utils.auth import validate_api_key
from utils.translation import translation
from validator.chat_gpt_validator import validate_token_count
from chat_gpt.race_progression import race_moderator_chatgpt
from chat_gpt.ending_generation import ending_generate_chatgpt
from models import GameEndingModel
from config import RaceInfoKeys

router = APIRouter()



@router.post("/race/ending")
def output_game_ending(ending_model:GameEndingModel,api_key: str = Security(validate_api_key)):
    """
    レースのエンディングを生成する  

    Args:  
    ending_model (GameEndingModel): エンディングの生成に使用する情報
    api_key (str): APIにアクセスするために必要なセキュリティーキー 

    Returns:  
    generated_text (str): ユーザー入力を元に生成されたシナリオ  
    first_place (str) : １位の車名  
    second_place (str): ２位の車名  
    third_place (str): ３位の車名  
    fourth_prace (str): ４位の車名  

    Raises:
        HTTP_408_REQUEST_TIMEOUT: ChatGPTの出力がフォーマットに則っていない
        HTTP_400_BAD_REQUEST: ユーザーの入力がトークンの上限を超えた.
    """

    # ユーザー入力を英語に翻訳し,入力を整形.
    text_en = "The goal is in sight!" + translation(ending_model.event,'JA','EN-US')
    
    # イベント文を更新
    ending_model.event = text_en

    # 入力トークンが上限(35トークン)を超えていないかチェック
    # 問題がない場合,ユーザ入力を元にChatGPTでエンディングのテキストを生成
    if validate_token_count(text_en,35):
        text_result,first,second,third,fourth = race_moderator_chatgpt(ending_model)
        ending_text = ending_generate_chatgpt(ending_model,text_result,first,second,third,fourth)

    # エンディングを日本語に翻訳
    ending_text_jp = translation(ending_text ,'EN','JA')

    print(ending_model.player_car_instruction)

    return {RaceInfoKeys.generated_text: ending_text_jp,
            RaceInfoKeys.first_place: first,
            RaceInfoKeys.second_place: second,
            RaceInfoKeys.third_place: third,
            RaceInfoKeys.fourth_place:fourth}