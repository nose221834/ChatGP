import sqlite3


def add_data(db:str,command:str):

    conn = sqlite3.connect(db)
    c = conn.cursor()
    
    c.execute(command)

    # 変更をコミットする
    conn.commit()

    # コネクションを閉じる
    conn.close()



if __name__ == '__main__':
    #add_data('car.db',"INSERT INTO enemy_car_data (car_id, path_img, name, luk, text) VALUES (2, 'database/car_img/car2.png', 'Feline Fury', 4, 'With its sleek exterior, cozy interior, and advanced features such as a built-in laser pointer for entertainment, this car is perfectly designed for cat lovers. You can be assured that every drive will feel like a catwalk. Meowvelous!')")
    pass