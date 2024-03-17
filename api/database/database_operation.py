import sqlite3
from validator.database_validator import connect_database,check_input_query
from fastapi import  HTTPException,status

class DatabaseOperator():

    def __init__(self,db:str,table:str) -> None:
        """
        データベースを操作するクラス

        Args:
            db (str): データベースのパス
            table (str): 作業テーブルの名称
        """
        self.db = db
        self.table = table

        # tableの構造を出力
        c = self._open_connection_with_db()
        query = f"PRAGMA table_info({table});"
        c.execute(query)
        information = c.fetchall()
        print(f"{table}の構造:{str(information)}")
        self._close_connection_with_db()

    def _open_connection_with_db(self):
        """
            データベースに接続し,カーソルを作成

            Args:
                None
            Returns:  
                c : カーソル
        """
        # データベースに接続
        self.conn = connect_database(self.db)
        c = self.conn.cursor()

        return c
    
    def _close_connection_with_db(self):
        """
            データベースに接続を閉じる

            Args:
                None
            Returns:  
                None
        """

        self.conn.close()

    def adding_data_to_db(self,columns_list:list,values_list:list) -> None:
        """
            データベースにデータを追加する

            Args:
                db (str): データベースのパス
                table (str): 作業テーブルの名称
                columns_list (list): テーブルが持つカラムのリスト
                values_list (list): データベースに保存するデータのリスト,保存先はcolumns_listのインデックスと対応している
            Returns:  
                None
        """

        # クエリの作成
        columns = ", ".join(columns_list)
        values = ", ".join(values_list)
        query = f"INSERT INTO {self.table} ({columns}) VALUES ({values})"

        # データベースに接続
        c = self._open_connection_with_db()
        
        # データベースに対してクエリを実行
        c.execute(query)

        # クエリによって実行された変更をデータベースにコミット
        self.conn.commit()

        # データベースとの接続を閉じる
        self._close_connection_with_db()

    def deleting_db_data(self, column:str, record: int | str) -> None:
        """
            データベースのデータを削除

            Args:
                db (str): データベースのパス
                table (str): 作業テーブルの名称
                column (str): 検索カラム
                record (int | str): 削除するレコード
            Returns:  
                None
        """

       # データベースに接続
        c = self._open_connection_with_db()
        
        # データを削除
        query = f"DELETE FROM {self.table} WHERE {column} = ?"
        c.execute(query, (record,))

        # クエリによって実行された変更をデータベースにコミット
        self.conn.commit()

        # データベースとの接続を閉じる
        self._close_connection_with_db()

    def get_data_from_db(self,key:str,id:int) -> list:
        """
            データベースからデータを取得する

            Args:
                db (str): データベースのパス
                table (str): データベースの作業テーブル
                key (str): 検索対象となるカラム
                id (int): 検索対象のid
                
            Returns:  
                results_list (list): 
        """

        # データベースに接続
        c = self._open_connection_with_db()

        #クエリに問題がないかチェック
        check_input_query([self.table,key])

        # table内からidと一意するデータをkey(カラム)の中から検索し,全カラムのデータを所得する
        # 形式:[(カラム1-1,カラム2-1,カラム3-1,・・・),(カラム2-1,カラム2-2,カラム3-2,・・・),・・・]
        query = f"SELECT * FROM {self.table} WHERE {key} = ?"
        c.execute(query, (id,))
        results_list = c.fetchall()

        # 検索結果が0件(存在しない)場合404エラーを発生
        if len(results_list)==0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Data that meet the specified conditions do not exist.") 
            
        #データベースとの接続を閉じる
        self._close_connection_with_db()

        return results_list

    def get_all_data_from_db(self) -> list:
        """
            指定したテーブルの全データをデータベースから取得する

            Args:
                db (str): データベースのパス
                table (str): データベースの作業テーブル
                
            Returns:  
                all_data_in_table (list): テーブル内の全データ
        """

        # データベースに接続
        c = self._open_connection_with_db()

        #クエリに問題がないかチェック
        check_input_query([self.table])

        # table内から全データを取得
        query = f"SELECT * FROM {self.table}"
        c.execute(query)
        all_data_in_table = c.fetchall()

        #データベースとの接続を閉じる
        self._close_connection_with_db()

        return all_data_in_table

    def count_record(self,key:str) -> int:
        """
            データベースのカラムが持つデータ数をカウント

            Args:
                db (str): データベースのパス
                table (str): データベースの作業テーブル
                key (str): カウント対象のカラム
                
            Returns:  
                count (int): データ数 
        """

        # データベースに接続
        c = self._open_connection_with_db()

        # クエリに問題がないかチェック
        check_input_query([self.table,key])

        # table内のkey(カラム)に要素が何個あるかをカウントし取得
        query = f"SELECT COUNT({key}) FROM {self.table}"
        c.execute(query)
        count = c.fetchone()[0]

        # データベースとの接続を閉じる
        self._close_connection_with_db()

        return count

if __name__ == '__main__':
    #add_data('database/.db',enemy_car_data,[car_id, path_img, name, luk, text],[20, 'path', 'name', 4, 'text'])
    pass
