document.addEventListener('DOMContentLoaded', async () => {
    let teste = document.getElementById('gerarCoordenadas')
    teste.addEventListener('click', async (e) => {
        criaMapa()
    })
  });
  
  let url = '/api/dados';
  let fileInput = document.getElementById('pdf_file');
  
  let enviar = document.getElementById('enviar');
  
  enviar.addEventListener('click', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de enviar o formulário
  
    let file = fileInput.files[0]; // Obtém o arquivo selecionado pelo usuário
  
    let formData = new FormData();
    formData.append('pdf_file', file); // Adiciona o arquivo ao objeto FormData
  
    let conexao = new Conexao(url, formData);
    let result = await conexao.sendPDFFile(file); // Envia o arquivo usando o método sendPDFFile
  
    console.log(result);
  });
  
  async function obterCoordenadas() {
    let dados = {}
    let url = '/api/dados'
    let conexao = new Conexao(url, dados)
    return await conexao.sendPostRequest()
  }
  

  const criaMapa = async()=>{
    let result = await obterCoordenadas()
    // Cria o mapa
    var map = L.map('map').setView([-23.4743594, -46.4741434], 12);

    // Adicionar o tile layer (mapa de fundo)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(map);

    let coletasData = result

    // Adicionar marcadores para cada coleta
    // coletasData.forEach(coleta => {
    //   if (coleta.latitude && coleta.longitude) {
    //     var latitude = coleta.latitude;
    //     var longitude = coleta.longitude;
    //     var numeroColeta = coleta.coleta;
    //     var volume = coleta.volume;
    //     var peso = coleta.peso;
    //     var marker = L.marker([latitude, longitude])
    //       .bindPopup(`Numero da Coleta: ${numeroColeta}<br>volumes: ${volume} Peso:${peso}`)
    //       .addTo(map);

    //     // Adicionar listener para o evento de clique
    //     marker.on('click', function () {
    //       console.log(`Marcador ${numeroColeta} clicado`);
    //       // Aqui você pode fazer o que quiser com o marcador clicado, por exemplo, exibir informações adicionais ou redirecionar para outra página
    //     });
    //   }
    // });
  }

