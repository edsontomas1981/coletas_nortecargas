alert('api')
class APIConnection {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
  
    async enviarDados(dados) {
      try {
        const response = await fetch(`${this.apiUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
        });
        
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados');
        }
        
        const resposta = await response.json();
        return resposta;
      } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error;
      }
    }
  
    async receberDados() {
      try {
        const response = await fetch(`${this.apiUrl}`);
        
        if (!response.ok) {
          throw new Error('Erro ao receber os dados');
        }
        
        const dados = await response.json();
        return dados;
      } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error;
      }
    }

    async enviarArquivo(arquivo) {
        try {
          const formData = new FormData();
          formData.append('arquivo', arquivo);
    
          const response = await fetch(`${this.apiUrl}`, {
            method: 'POST',
            body: formData
          });
    
          if (!response.ok) {
            throw new Error('Erro ao enviar o arquivo');
          }
    
          const resposta = await response.json();
          return resposta;
        } catch (error) {
          console.error('Ocorreu um erro:', error);
          throw error;
        }
      }
  }

  let form = document.getElementById('formulario')

  form.addEventListener('submit',(e)=>{
      // Crie uma instância da classe APIConnection
    const api = new APIConnection('http://localhost:5000/api/dados');

    // Enviar dados para a API
    const dadosEnviados = { chave: 'valor' };
    api.enviarDados(dadosEnviados)
    .then(resposta => console.log(resposta))
    .catch(error => console.error(error));

    // Receber dados da API
    api.receberDados()
    .then(dadosRecebidos => console.log(dadosRecebidos))
    .catch(error => console.error(error));
    e.preventDefault();
  })


  const fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', function(event) {
    // Crie uma instância da classe APIConnection
    const api = new APIConnection('http://localhost:5000/api/upload');

        // Selecione o arquivo do input de arquivo (exemplo: <input type="file" id="fileInput">)
        const fileInput = document.getElementById('fileInput');
        const arquivo = fileInput.files[0];

        // Enviar o arquivo para a API
        api.enviarArquivo(arquivo)
        .then(resposta => console.log(resposta))
        .catch(error => console.error(error));

    });
  
