from flask import Flask, render_template, request, jsonify
from util import coordenadas_por_endereco, lat_long
from controller import ler_linha_pdf
import os

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        arquivo_pdf = request.files['arquivo_pdf']
        arquivo_pdf.save(os.path.join('uploads', arquivo_pdf.filename))
        caminho_completo = os.path.join('uploads', arquivo_pdf.filename)
        coletas = ler_linha_pdf(caminho_completo)# resposts{'cep': '03003050', 'coleta': '412092', 'volumes': '1', 'peso': '28'}
        jsonResposta = []
        for coleta in coletas:
            endereco=lat_long(coleta['cep'])
            # {'altitude': 760.0, 'cep': '03003050', 
            # 'latitude': '-23.6695000204', 'longitude': '-46.5034630582', 
            # 'logradouro': 'Rua Vasco da Gama', 'bairro': 'Brás', 
            # 'cidade': {'ddd': 11, 'ibge': '3550308', 'nome': 'São Paulo'}, 
            # 'estado': {'sigla': 'SP'}}
            rua=endereco['logradouro']
            cidade=endereco['cidade']['nome']
            estado =endereco['estado']['sigla']    
            coordenadas=coordenadas_por_endereco(rua,cidade,estado)

            jsonResposta.append({'latitude':coordenadas[0],
                                 'longitude':coordenadas[0],
                                 'coleta':coleta['coleta'],
                                 'volume':coleta['volumes'],
                                 'peso':coleta['peso'],
                                 })


            # //     var latitude = coleta.latitude;
            # //     var longitude = coleta.longitude;
            # //     var numeroColeta = coleta.coleta;
            # //     var volume = coleta.volume;
            # //     var peso = coleta.peso;

        return jsonify(jsonResposta)
    else:
        # Renderizar o formulário
        return render_template('formulario.html')

# @app.route('/teste')
# def teste():
#     # Lógica para manipular a requisição AJAX
#     data = {'message': 'Resposta da requisição AJAX'}
#     return jsonify(data)

if __name__ == '__main__':
    app.run()

