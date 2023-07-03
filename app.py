from flask import Flask, render_template, request,jsonify
import os

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    UPLOAD_FOLDER = 'uploads'
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    if request.method == 'POST':
        # Processar os dados enviados pelo formulário
        nome = request.form.get('nome')
        email = request.form.get('email')
        arquivo_pdf = request.files['arquivo_pdf']
        
        # Salvar o arquivo PDF
        arquivo_pdf.save(f'uploads/{arquivo_pdf.filename}')
        
        # Realizar qualquer lógica adicional com os dados recebidos
        
        # Retornar uma resposta ou redirecionar para outra página
        return f'Nome: {nome}<br>Email: {email}<br>Arquivo PDF enviado: {arquivo_pdf.filename}'
    else:
        # Renderizar o formulário
        return render_template('formulario.html')

@app.route('/teste', methods=['GET', 'POST'])
def teste():
        return jsonify({'nome': 'nome', 'email': 'email'})



if __name__ == '__main__':
    app.run()
