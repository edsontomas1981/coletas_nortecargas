from flask import Flask, jsonify,request
from flask_cors import CORS
from util import coordenadas_por_endereco, lat_long
from controller import ler_linha_pdf

app = Flask(__name__)
CORS(app)

@app.route('/api/dados', methods=['POST'])
def cep():
    data = request.get_json() 

    dados_coleta = ler_linha_pdf()

    response=[]

    for dado in dados_coleta:

        endereco_json = lat_long(dado['cep'])
        logradouro = endereco_json['logradouro']
        cidade = endereco_json['cidade']['nome']
        estado = endereco_json['estado']['sigla']

        coordenadas = coordenadas_por_endereco(logradouro,cidade,estado)

        response.append({'coleta':dado['coleta'],
                         'volume':dado['volumes'],
                         'peso':dado['peso'],
                         'latitude':coordenadas[0],
                        'longitude':coordenadas[1],
                        })

    return response

if __name__ == '__main__':
    app.run()