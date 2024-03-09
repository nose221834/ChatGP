import sqlite3
from database.database_validator import connect_database,check_input_query
from fastapi import  HTTPException,status

def add_data(db:str,command:str):

    conn = connect_database(db)
    c = conn.cursor()
    
    c.execute(command)

    # 変更をコミットする
    conn.commit()

    # コネクションを閉じる
    conn.close()


def get_data(db:str,table:str,key:str,id:int) -> list:
    conn = connect_database(db)
    c = conn.cursor()

    check_input_query([table,key])

    query = f"SELECT * FROM {table} WHERE {key} = ?"
    c.execute(query, (id,))

    results_list = c.fetchall()

    if len(results_list)==0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Data that meet the specified conditions do not exist.") 
        

    conn.close()
    return results_list

def count_record(db:str,table:str,key:str) -> int:
    conn = connect_database(db)
    c = conn.cursor()

    check_input_query([table,key])

    query = f"SELECT COUNT({key}) FROM {table}"
    c.execute(query)
    count = c.fetchone()[0]

    conn.close()
    return count

if __name__ == '__main__':
    #add_data('car.db',"INSERT INTO enemy_car_data (car_id, path_img, name, luk, text) VALUES (2, 'database/car_img/car2.png', 'Feline Fury', 4, 'With its sleek exterior, cozy interior, and advanced features such as a built-in laser pointer for entertainment, this car is perfectly designed for cat lovers. You can be assured that every drive will feel like a catwalk. Meowvelous!')")
    pass