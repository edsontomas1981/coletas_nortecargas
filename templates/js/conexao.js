class Conexao {
    constructor(url,data){
        this.url=url
        this.data=data
    }

    getCSRFToken() {
        const cookieValue = document.cookie.match(/(^|;)csrftoken=([^;]*)/)[2];
        return cookieValue;
      }
    
      async sendPostRequest() {
        // this.csrfToken=this.getCSRFToken()
        try {
          const response = await fetch(this.url, {
            method: "POST", // definindo o método HTTP como POST
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": this.csrfToken,
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
          alert("Erro interno!");
        }
      }
}