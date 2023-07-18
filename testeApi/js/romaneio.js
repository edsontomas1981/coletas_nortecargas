const geraLinhaRomaneio = (coleta,remetente,cidade,volume,peso) => {
    let tabela = document.getElementById('tabelaRomaneio');
    let linha = tabela.insertRow();
  
    let cell1 = linha.insertCell();
    let cell2 = linha.insertCell();
    let cell3 = linha.insertCell();
    let cell4 = linha.insertCell();
    let cell5 = linha.insertCell();
  
    cell1.innerHTML = `
      <i class="fa fa-trash" aria-hidden="true" onclick="removeRomaneio()"></i>
      <span>${coleta}</span>
    `;
    cell2.innerHTML = remetente;
    cell3.innerHTML = cidade;
    cell4.innerHTML = volume;
    cell5.innerHTML = peso;
  
    // Adicione a classe 'truncate' às células que você deseja truncar
    cell2.classList.add('truncate');
    cell3.classList.add('truncate');
  };

const removeRomaneio=()=>{
    alert('remove')
}
const limpaRomaneio = ()=>{
    let romaneio = document.getElementById('relatorio')
    let html = ""
    romaneio.innerHTML = html
}

document.getElementById('geraRomaneio').addEventListener('click',()=>{
    // let numero = criaNumRomaneio();
    // let veiculo = getVeiculoSelecionado()
    // let motorista = getMotoristaSelecionado()
    // let coletas  = []
    // let romaneioColeta = {'numero':numero,'veiculo':veiculo,'motorista':motorista,'coletas':coletas};
    // preencheNumRomaneio(numero);
    // sessionStorage.setItem(numero, JSON.stringify(romaneioColeta));
})

const getMotoristaSelecionado = ()=>{
    let selectMotorista = document.getElementById('motorista') 
    let motorista = selectMotorista.options[selectMotorista.selectedIndex];
    return motorista.text
}

const getVeiculoSelecionado = ()=>{
    let selectVeiculo = document.getElementById('veiculo')
    let veiculo = selectVeiculo.options[selectVeiculo.selectedIndex];
    return veiculo.text
}

const adicionarColeta = (event) => {
    let markerId = event.target.dataset.marker;
    let remetente = event.target.dataset.remetente;
    let cidade = event.target.dataset.cidade;
    let volume = event.target.dataset.volume;
    let peso = event.target.dataset.peso;
    let coleta = event.target.dataset.coleta;

    let marker = marcadores.find(m => m.id == markerId); // Encontra o marcador pelo ID
  
    if (marker) {
        geraLinhaRomaneio(coleta,remetente,cidade,volume,peso)
        removerPinDoMapa(marker);
      
    } else {
      console.log("Marcador não encontrado com o ID especificado:", markerId);
    }
  };

const criaNumRomaneio = ()=>{
    let dataAtual = new Date();
    // Obtendo os valores individuais da data
    let dia = String(dataAtual.getDate()).padStart(2, '0'); // Retorna o dia do mês (01-31)
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Retorna o mês (01-12)
    let horas = String(dataAtual.getHours()).padStart(2, '0'); // Retorna as horas (00-23)
    let minutos = String(dataAtual.getMinutes()).padStart(2, '0'); // Retorna os minutos (00-59)
    let segundos = String(dataAtual.getSeconds()).padStart(2, '0'); // Retorna os segundos (00-59)
    let numero = dia+mes+horas+minutos+segundos
    return numero
}

const preencheNumRomaneio = (numero)=>{
    let numRomaneio = document.getElementById('numRomaneio')
    numRomaneio.textContent = numero
}


const removeItem =(numeroColeta)=>{
    var coletasData = sessionStorage.getItem("dados");

    // Variável para armazenar o índice do registro a ser removido
    var indiceRemovido = -1;

    // Percorre o array de registros
    for (var i = 0; i < coletasData.length; i++) {
    if (coletasData[i].coleta === numeroColeta) {
        // Encontrou o registro com o número da coleta
        registroRemovido = coletasData[i];
        indiceRemovido = i;
        break;
    }
    }

    if (indiceRemovido !== -1) {
    // Remove o registro do array
    coletasData.splice(indiceRemovido, 1);
    console.log("Registro removido:", registroRemovido);
    console.log("Array atualizado:", coletasData);
    } else {
    console.log("Registro não encontrado com o número da coleta especificado.");
    }

    sessionStorage.setItem(dados, JSON.stringify(coletasData));


}

const removerPinDoMapa=(marker)=>{
    marker.setMap(null);
  }