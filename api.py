from flask import Flask, request, jsonify
from flask_cors import CORS
from controller import ler_linha_pdf
from util import lat_long,geocode
from models import inserir_coleta,select_coletas
import os


app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_arquivo():
    arquivo = request.files['arquivo']
    arquivo.save(os.path.join('uploads', arquivo.filename))
    caminho_completo = os.path.join('uploads', arquivo.filename)
    coletas = ler_linha_pdf(caminho_completo)
    resposta = []

    for coleta in coletas:
        endereco = lat_long(coleta['cep'])
        endereco_busca_coords = f'''{endereco['logradouro']} , {endereco['cidade']['nome']} , 
                                    {endereco['estado']['sigla']}'''
        coordenadas = geocode(endereco_busca_coords)
        if coordenadas is not None:
            resposta.append({
                'lat': coordenadas[0],
                'lng': coordenadas[1],
                'coleta': coleta['coleta'],
                'volume': coleta['volumes'],
                'peso': coleta['peso'],
            })
            dados = {'coleta': coleta['coleta'],'cep':coleta['cep'],
                     'logradouro':endereco['logradouro'],
                     'cidade':endereco['cidade']['nome'],
                     'uf':endereco['estado']['sigla'],
                     'lat':coordenadas[0],
                     'lng': coordenadas[1],
                     'remetente':coleta['remetente'],
                     'volume': coleta['volumes'],
                     'peso': coleta['peso'],
                     }
            inserir_coleta(dados)

    return jsonify(resposta), 200


@app.route('/api/coletas', methods=['POST','GET'])
def get_coletas():
    coletas=select_coletas()
    json_coletas=gera_dict_coletas(coletas)
    return jsonify(json_coletas), 200


def gera_dict_coletas(coletas):
    json_coletas = []
    for coleta in coletas:
        json_coletas.append({
                'cep':coleta[2],
                'endereco':coleta[3],
                'cidade':coleta[4],
                'estado':coleta[5],
                'lat':coleta[6],
                'lng': coleta[7],
                'coleta': coleta[1],
                'volume': coleta[9],
                'peso': coleta[10],
                'remetente': coleta[8],
            })
    return json_coletas


if __name__ == '__main__':
    app.run()

