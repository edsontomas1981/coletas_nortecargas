import sqlite3
import datetime
import os

def select_coletas():
    # Se o arquivo não existir ele cria e conecta, senão só conecta
    con = sqlite3.connect('./bd_coletas.db')
    cur = con.cursor()

    sql = f'''SELECT * FROM coleta;'''
    
    cur.execute(sql)
    
    linhas = cur.fetchall()
    con.close()
    
    return linhas

