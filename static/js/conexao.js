class Conexao {
  constructor(url, data) {
    this.url = url;
    this.data = data;
    this.csrfToken = this.getCSRFToken();
  }

  getCSRFToken() {
    return fetch('/token', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => data.csrf_token)
      .catch(error => {
        console.error(error);
        alert('Erro ao obter o token CSRF!');
      });
  }
  

  async sendPostRequest() {
    try {
      const csrfToken = await this.getCSRFToken(); // Obter o token CSRF antes da requisição
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(this.data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      alert('Erro interno!');
    }
  }
  
  async sendPDFFile(pdfFile) {
    try {
      const csrfToken = await this.getCSRFToken(); // Obter o token CSRF antes da requisição
      const formData = new FormData();
      formData.append('pdf_file', pdfFile);
  
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      alert('Erro interno!');
    }
  }
 
}