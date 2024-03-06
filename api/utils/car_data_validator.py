import random
from fastapi import  HTTPException,status
from transformers import GPT2Tokenizer

def validate_car_data(result:list,error_count:int) -> bool:

    """
        ChatGPTが出力した車のステータスがフォーマットに則っているか確認
        3回失敗したらエラーを出力
        Args:
            result (list): ChatGPTの出力を分割して格納したリスト.len(result)=3
            error_count (int): フォーマットに従わない出力が行われた回数
        Returns:
            bool: returnは正常/異常(1/0)
        Raises:
            HTTP_408_REQUEST_TIMEOUT: ChatGPTが LUK(int)|NAME(str)|TEXT(str) のフォーマットに従っていない.
    """
    try:

        #lukが数値になっているか？　ChatGPTの出力(str)をintに変換
        result[0] = int(result[0])

        assert len(result) == 3 
        return True

    except:
        print(result)
        if error_count >= 4:
            raise HTTPException(
                status_code=status.HTTP_408_REQUEST_TIMEOUT,
                detail="ChatGPT output does not follow the format",
            )
        else:
            return False

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

def validate_token_count(text:str,token_num:int) -> bool:
    
    """
        ユーザーの入力トークン数が上限を超えていないかのチェック
        上限を超えるとエラーを出力
        Args:
            text (str): ユーザーの入力
            token_num (int): トークンの上限
        Returns:
            bool: returnは正常/異常(1/0)
        Raises:
            HTTP_400_BAD_REQUEST: ユーザーの入力がトークンの上限を超えた.
    """

    tokens = tokenizer.tokenize(text)
    if len(tokens) <= token_num:
        return True
    else:
        print("text:"+text)
        print("token_num:"+str(token_num))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Number of tokens has exceeded the input limit.",
        )


