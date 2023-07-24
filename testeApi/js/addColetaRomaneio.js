// const adicionarColeta = (event) => {
//     let markerId = event.target.dataset.marker;
//     let remetente = event.target.dataset.remetente;
//     let cidade = event.target.dataset.cidade;
//     let volume = event.target.dataset.volume;
//     let peso = event.target.dataset.peso;
//     let coletaId = event.target.dataset.coleta;
  
//     let marker = marcadores.find(m => m.id == markerId); // Encontra o marcador pelo ID
  
  
//     if (marker) {
//       geraLinhaRomaneio(coletaId, remetente, cidade, volume, peso);
//       removerPinDoMapa(marker);
  
//       // Obter o número do romaneio da tabela e passá-lo como parâmetro
//       let numeroRomaneio = "2407123650"
//       let coleta = getColetaInColetas(coletaId);
//       adicionarColetaNoRomaneio(numeroRomaneio, coleta);
  
//     } else {
//       console.log("Marcador não encontrado com o ID especificado:", markerId);
//     }
//   };

const adicionarColeta = (event) => {
  let markerId = event.target.dataset.marker;
  let remetente = event.target.dataset.remetente;
  let cidade = event.target.dataset.cidade;
  let volume = event.target.dataset.volume;
  let peso = event.target.dataset.peso;
  let coletaId = event.target.dataset.coleta;

  let coleta = getColetaInColetas(coletaId);

  
adicionarColetaNoRomaneio(numRomaneio,coleta);

  
};

function adicionarColetaNoRomaneio(numeroRomaneio, coleta) {
    // Recuperando o JSON da sessão
    let romaneio = sessionStorage.getItem(numeroRomaneio);
    let meuJSON = JSON.parse(romaneio);

    meuJSON.coletas.push(coleta);

    try {
        // Convertendo o JSON de volta para uma string usando a biblioteca circular-json
        let updatedJSONString = CircularJSON.stringify(meuJSON);
        // Atualizando o JSON na sessão
        sessionStorage.setItem(numeroRomaneio, updatedJSONString);
    } catch (error) {
        console.error("Erro ao converter o JSON:", error);
    }

}


    // // Obter o objeto de romaneios da sessão ou um objeto vazio, se não houver romaneios ainda
    // const romaneios = JSON.parse(sessionStorage.getItem('romaneios')) || {};
  
    // // Verificar se o romaneio com o número fornecido existe na sessão
    // if (romaneios[numeroRomaneio]) {
    //   // Adicionar a coleta ao array de coletas do romaneio
    //   romaneios[numeroRomaneio].coletas.push(coleta);
  
    //   // Armazenar o objeto de romaneios atualizado na sessão
    //   sessionStorage.setItem('romaneios', JSON.stringify(romaneios));
  
    //   console.log('Coleta adicionada ao romaneio com sucesso!');
    // } else {
    //   console.log('Romaneio não encontrado. Verifique o número do romaneio.');
    // }

  