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