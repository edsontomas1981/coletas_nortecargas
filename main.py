from flask import Flask, jsonify, request, render_template
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_cors import CORS
from util import coordenadas_por_endereco, lat_long
from controller import ler_linha_pdf

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

# Configuração do CSRF
app.config['SECRET_KEY'] = 'sua_secret_key_aqui'
csrf = CSRFProtect(app)

@app.route('/api/dados', methods=['POST'])
def cep():
    file = request.files['pdf_file']  # Obtém o arquivo enviado pelo cliente
    file.save('<coletas/arquivo>')  # Salva o arquivo no local desejado

    response = {'status': 'success'}
    return jsonify(response)

@app.route('/token', methods=['POST'])
def get_csrf_token():
    csrf_token = generate_csrf()
    return jsonify({'csrf_token': csrf_token})


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Lógica para processar o formulário
        return "Formulário enviado"

    # Gere o token CSRF
    csrf_token = generate_csrf()

    # Renderize o template e inclua o token no contexto
    return render_template('roterizacao.html', csrf_token=csrf_token)

if __name__ == '__main__':
    app.run()


    # dados_coleta = ler_linha_pdf()

    # response=[]

    # for dado in dados_coleta:

    #     endereco_json = lat_long(dado['cep'])
    #     logradouro = endereco_json['logradouro']
    #     cidade = endereco_json['cidade']['nome']
    #     estado = endereco_json['estado']['sigla']

    #     coordenadas = coordenadas_por_endereco(logradouro,cidade,estado)

    #     response.append({'coleta':dado['coleta'],
    #                      'volume':dado['volumes'],
    #                      'peso':dado['peso'],
    #                      'latitude':coordenadas[0],
    #                     'longitude':coordenadas[1],
    #                     })
    # return response
