import sqlite3
import datetime
import os

def inserir_coleta(dados):
    # Se o arquivo não existir ele cria e conecta, senão só conecta
    con = sqlite3.connect('./bd_coletas.db')
    cur = con.cursor()

    # Cria a tabela no banco de dados do arquivo acima se a tabela não existir
    cur.execute('''CREATE TABLE IF NOT EXISTS coleta
                (id integer primary key, id_coleta integer, 
                cep text, logradouro text, cidade text,
                uf text, lat text, lng text, remetente text,
                volume integer,peso real);''')
    
    # valida as alterações feitas
    con.commit()
    
    sql = f'''INSERT INTO coleta (id_coleta, cep, logradouro, cidade, uf, lat, 
                                lng, remetente,volume,peso)
                                SELECT {dados['coleta']}, '{dados['cep']}', 
                                '{dados['logradouro']}','{dados['cidade']}', 
                                '{dados['uf']}', '{dados['lat']}','{dados['lng']}', 
                                '{dados['remetente']}','{dados['volume']}', 
                                '{dados['peso']}'
                                WHERE NOT EXISTS (SELECT 1 FROM coleta WHERE 
                                id_coleta = {dados['coleta']});'''

    cur.execute(sql)

    # valida as alterações feitas
    con.commit()

    con.close()
    print (f"coleta {dados['coleta']} adicionado com sucesso !")

