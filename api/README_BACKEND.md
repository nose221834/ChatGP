# api
バックエンドを記述

## Description
FastAPIを使用してChatGPTAPIを操作できるようにする.


## Usage
API使用方法
- ``/create/enemy`` :  
    　　敵キャラクターの情報を取得

    Args:

    Returns:  
    　　``enemy_car_image`` (bytes):入力されたidに対応した車の画像バイナリー  
    　　``enemy_car_name`` (str):車の名前  
    　　``enemy_car_luck`` (int):車の運勢  
    　　``enemy_car_instruction`` (str): 車の解説  

    
- ``/race/middle_part`` :  
    　　ユーザーの入力を元にイベントを発生させ,レースの進行を行う  

    Args:  
    　　``first_car_name`` (str): １位の車名  
    　　``second_car_name`` (str): ２位の車名  
    　　``third_car_name`` (str): ３位の車名  
    　　``fourth_car_name`` (str): ４位の車名  
    　　``player_car_name`` (str): プレーヤーの車の名前  
    　　``first_car_instruction`` (str): １位の車の説明文  
    　　``second_car_instruction`` (str): ２位の車の説明文  
    　　``third_car_instruction`` (str): ３位の車の説明文  
    　　``fourth_car_instruction`` (str): ４位の車の説明文  
    　　``event`` (str):ユーザーの入力内容  

    Returns:  
    　　``generated_text`` (str):ユーザー入力を元に生成されたシナリオ  
    　　``first_place`` (str):１位の車名  
    　　``second_place`` (str):２位の車名  
    　　``third_place`` (str):３位の車名  
    　　``fourth_prace`` (str):４位の車名  

- ``/race/ending`` :  
    　　レースのエンディングを生成する  

    Args:  
    　　``first_car_name`` (str): １位の車名  
    　　``second_car_name`` (str): ２位の車名  
    　　``third_car_name`` (str): ３位の車名  
    　　``fourth_car_name`` (str): ４位の車名  
    　　``player_car_name`` (str): プレーヤーの車の名前  
    　　``first_car_instruction`` (str): １位の車の説明文  
    　　``second_car_instruction`` (str): ２位の車の説明文  
    　　``third_car_instruction`` (str): ３位の車の説明文  
    　　``fourth_car_instruction`` (str): ４位の車の説明文  
    　　``event`` (str):ユーザーの入力内容  
    　　``player_luck`` (int)：　プレーヤーの運勢パラメータ  

    Returns:  
    　　``generated_text`` (str):ユーザー入力を元に生成されたシナリオ  
    　　``first_place (str)`` :１位の車名  
    　　``second_place`` (str):２位の車名  
    　　``third_place`` (str):３位の車名  
    　　``fourth_prace`` (str):４位の車名  

- ``/car/create`` :  
    　　ユーザーの入力を元にChatGPTが車を作成する  

    Args:  
    　　``text_inputted_by_user`` (str):　ユーザーの入力  
    Returns:  
    　　``player_car_image`` (bytes): 生成された車画像のバイナリー  
    　　``player_car_name`` (str):　生成された車の名前  
    　　``player_car_luck`` (int):　生成された車の運勢パラメータ  
    　　``player_car_instruction`` (str):　生成された車の紹介文  

- ``/test/car/create/status`` :  
    　　ChatGPTのテキスト生成機能確認用API  
    Args:  
    　　``text_inputted_by_user`` (str):　ユーザーの入力  
    Returns:  
    　　``player_car_name`` (str):　生成された車の名前  
    　　``player_car_luck`` (int):　生成された車の運勢パラメータ  
    　　``player_car_instruction`` (str):　生成された車の紹介文  

- ``/test/translation`` :  
    　　DeepLによる翻訳API  
    Args:  
    　　``text_inputted_by_user`` (str):　ユーザーの入力  
    Returns:  
    　　``en_text`` (str): 英語に翻訳後のテキスト  


## File Structure

- ``api_test/`` :  
    　　開発中にAPIの料金を抑えるために使用するテストAPI  

  - ``test_media/`` :  
    　　テストAPIで使用する画像データ  

  - ``no_rembg.py`` :  
    　　``chat_gpt/car_data.py``の代わりに使用,rembg(背景透過ライブラリ)を使用していない  

  - ``test_car_data.py`` :  
    　　``chat_gpt/car_data.py``の代わりに使用,Next.jsの動作確認に使用  

  - ``test_translation.py`` :  
    　　DeepLの動作確認用API  

- ``chat_gpt/`` :  
    　　ChatGPTを用いた処理を管理  

  - ``ending_generation.py`` :  
    　　レース内での行動や車のステータスを元にエンディングを生成するロジック
    　　文章生成サービス(ChatGPT)との連携を担当  

  - ``image_generation.py`` :  
    　　ユーザーの入力に基づいて車の画像を生成するロジック  
    　　画像生成サービス(ChatGPT)との連携を担当  

  - ``race_progression.py`` :    
    　　ユーザーの入力に基づいてレースの進行を行うロジック  
    　　文章生成サービス(ChatGPT)との連携を担当  

  - ``status_generation.py`` :    
    　　ユーザーの入力に基づいて車のステータスを生成するロジック  
    　　文章生成サービス(ChatGPT)との連携を担当  

- ``database/`` :  
  - ``car_img/`` :  
    　　敵キャラクター(車)の画像  
  - ``.db`` :  
    　　敵キャラクター(車)のステータスや画像を管理  

  - ``database_operation.py`` :    
    　　データベースに対するクエリを作成,データベースを操作する  

- ``routes/`` :  
  - ``database_routes.py`` :    
    　　データベースからデータを取得するAPI  
    　　敵キャラクターのデータをフロントに送信する  

  - ``car_generation_routes.py`` :  
    　　ユーザーの入力を元に車の外見やステータスを生成するAPI  

  - ``ending_routes.py`` :  
    　　レースのエンディングを生成するAPI  
    　　ゴール直前の行動と車のステータスを元に作成したエンディングを送信する  

  - ``race_routes.py`` :  
    　　ユーザーの入力を元にレースの進行を行うAPI  
    　　ユーザーが行った行動の結果を送信する.  
  

- ``s3/`` :  
  - ``aws_handler.py`` :    
    　　s3接続と操作のためのユーティリティ  
    　　S3との通信を扱う関数や、データの保存と取得のためのロジックを含む  
    　　S3から画像URLの取得  

  - ``image_interacter.py`` :    
    　　S3上にある画像のURLを返すAPI  

- ``utils/`` :  
    　　共通ユーティリティ関数やヘルパー関数   
    　　データの検証、形式の変換、などを含む  

  - ``auth.py`` :   
    　　HTTPヘッダーの検証を行う  

  - ``remove_bg.py`` :    
    　　画像の背景を透過する  

  - ``reverse_image.py`` :    
    　　画像を左右反転する  

  - ``save_image.py`` :   
    　　画像を保存する  

  - ``translation.py`` :    
    　　DeepLを使用して翻訳を行う  

- ``validator/`` :  
  - ``chat_gpt_validator.py`` :    
    　　ChatGPTの入出力がフォーマットに従っているか検証を行う  

  - ``database_validator.py`` :    
    　　データベースに対するクエリの検証を行う  
      
- ``config.py`` :     
    　　変数名を管理  

- ``main.py`` :    
    　　アプリケーションのエントリーポイント  
    　　FastAPIのインスタンスを作成  

- ``models.py``:   
    　　APIリクエストとレスポンスのPydanticモデル  

- ``README_BACKEND.md`` :    
    　　プロジェクトの説明、セットアップ手順、使用方法などを記載するドキュメント  

- ``requirements.txt`` :    
    　　pipでインストールするライブラリ一覧  

