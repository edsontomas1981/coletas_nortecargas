document.addEventListener('DOMContentLoaded', async ()=> {
    buscaDadosApi();
  });

  const buscaDadosApi = ()=>{
    // Crie uma instância da classe APIConnection
    const api = new APIConnection('http://localhost:5000/api/coletas');

    limpaMapa();
    // Enviar o arquivo para a API
    api.receberDados()
    .then(resposta => {
        criarMapa(resposta);
        let dados = "dados"
        sessionStorage.setItem(dados, JSON.stringify(resposta));
      })
    .catch(error => console.error(error));
}