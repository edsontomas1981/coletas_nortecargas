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

    #     name: 'Localização 2',
    #     lat: -23.550520,
    #     lng: -46.633308,
    #     info: 'Informações sobre a Localização 2'
    

            rua=endereco['logradouro']
            cidade=endereco['cidade']['nome']
            estado =endereco['estado']['sigla']    
            coordenadas=coordenadas_por_endereco(rua,cidade,estado)
            print(coordenadas)
            jsonResposta.append({'lat':coordenadas[0],
                                 'lng':coordenadas[1],
                                 'coleta':coleta['coleta'],
                                 'volume':coleta['volumes'],
                                 'peso':coleta['peso'],
                                 })
            
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

