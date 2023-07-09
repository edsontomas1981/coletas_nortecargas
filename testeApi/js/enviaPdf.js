let enviaPdf = document.getElementById('enviaPdf')

enviaPdf.addEventListener('click',(e)=>{
  alert(1)
  const fileInput = document.getElementById('fileInput');
  // Selecione o arquivo do input de arquivo (exemplo: <input type="file" id="fileInput">)
  const arquivo = fileInput.files[0];

  // Crie uma instância da classe APIConnection
  const api = new APIConnection('http://localhost:5000/api/upload');

  // Enviar o arquivo para a API
  api.enviarArquivo(arquivo)
  .then(resposta => criarMapa(resposta))
  .catch(error => console.error(error));

  e.preventDefault();
})
