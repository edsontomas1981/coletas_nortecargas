from flask import Flask, request, jsonify
from flask_cors import CORS
from controller import ler_linha_pdf
from util import lat_long,coordenadas_por_endereco
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/dados', methods=['POST'])
def receber_dados():
    dados = request.json
    # print(dados)
    
    # coletas = ler_linha_pdf(caminho_completo)# resposts{'cep': '03003050', 'coleta': '412092', 'volumes': '1', 'peso': '28'}
    # jsonResposta = []
#     for coleta in coletas:
#         endereco=lat_long(coleta['cep'])

# #     name: 'Localização 2',
# #     lat: -23.550520,
# #     lng: -46.633308,
# #     info: 'Informações sobre a Localização 2'


#         rua=endereco['logradouro']
#         cidade=endereco['cidade']['nome']
#         estado =endereco['estado']['sigla']    
#         coordenadas=coordenadas_por_endereco(rua,cidade,estado)
#         print(coordenadas)
#         jsonResposta.append({'lat':coordenadas[0],
#                                 'lng':coordenadas[1],
#                                 'coleta':coleta['coleta'],
#                                 'volume':coleta['volumes'],
#                                 'peso':coleta['peso'],
#                                 })
            
#         return jsonify(jsonResposta)
#     # Faça o processamento dos dados recebidos
#     # ...
#     # Retorne uma resposta
    resposta = {'mensagem': 'Dados recebidos com sucesso'}
    return jsonify(resposta), 200

@app.route('/api/dados', methods=['GET'])
def enviar_dados():
    # Obtenha os dados a serem enviados para o JavaScript
    # ...
    dados = {'chave': 'valor'}
    return jsonify(dados), 200

@app.route('/api/upload', methods=['POST'])
def upload_arquivo():
    arquivo = request.files['arquivo']
    arquivo.save(os.path.join('uploads', arquivo.filename))
    caminho_completo = os.path.join('uploads', arquivo.filename)
    coletas = ler_linha_pdf(caminho_completo)
    resposta = []

    for coleta in coletas:
        endereco = lat_long(coleta['cep'])
        rua = endereco['logradouro']
        cidade = endereco['cidade']['nome']
        estado = endereco['estado']['sigla']
        coordenadas = coordenadas_por_endereco(rua, cidade, estado)
        if coordenadas is not None:
            print(coordenadas)
            resposta.append({
                'lat': coordenadas[0],
                'lng': coordenadas[1],
                'coleta': coleta['coleta'],
                'volume': coleta['volumes'],
                'peso': coleta['peso'],
            })


    # Retorne uma resposta
    return jsonify(resposta), 200


if __name__ == '__main__':
    app.run()

