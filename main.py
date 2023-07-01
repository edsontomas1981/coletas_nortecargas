from flask import Flask, jsonify,request
from flask_cors import CORS
import sys
from util import coordenadas_por_endereco, lat_long

app = Flask(__name__)
CORS(app)

@app.route('/api/dados', methods=['POST'])
def cep():
    data = request.get_json() 
    endereco_json = lat_long(data['cep'])

    logradouro = endereco_json['logradouro']
    cidade = endereco_json['cidade']['nome']
    estado = endereco_json['estado']['sigla']

    coordenadas = coordenadas_por_endereco(logradouro,cidade,estado)

    return {'latitude':coordenadas[0],'longitude':coordenadas[1]}

if __name__ == '__main__':
    app.run()