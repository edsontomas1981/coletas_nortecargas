const geraLinhaRomaneio = (coleta, remetente, cidade, volume, peso) => {
    let tabela = document.getElementById('tabelaRomaneio');
    let linha = tabela.insertRow();
  
    linha.setAttribute('data-coleta', coleta); // Adiciona o atributo data-coleta à linha
  
    let cell1 = linha.insertCell();
    let cell2 = linha.insertCell();
    let cell3 = linha.insertCell();
    let cell4 = linha.insertCell();
    let cell5 = linha.insertCell();
  
    // Escapa o valor da coleta para evitar problemas de segurança
    const coletaEscaped = escapeHtml(coleta);
  
    cell1.innerHTML = `
      <i class="fa fa-trash" aria-hidden="true" onclick="removeRomaneio('${coletaEscaped}')"></i>
      <span>${coletaEscaped}</span>
    `;
  
    // Escapa os valores restantes para evitar problemas de segurança
    cell2.textContent = escapeHtml(remetente);
    cell3.textContent = escapeHtml(cidade);
    cell4.textContent = escapeHtml(volume);
    cell5.textContent = escapeHtml(peso);
  
    // Adicione a classe 'truncate' às células que você deseja truncar
    cell2.classList.add('truncate');
    cell3.classList.add('truncate');
  };
  

  const removeLinhaRomaneio = (coleta) => {
    let tabela = document.getElementById('tabelaRomaneio');
    let linha = tabela.querySelector(`tr[data-coleta="${coleta}"]`);
  
    if (linha) {
      tabela.deleteRow(linha.rowIndex);
    }
  };
  


const removeRomaneio = (coleta) => {
    removeLinhaRomaneio(coleta);
    recolocarPinNoMapa(coleta);
};

const recolocarPinNoMapa = (coleta) => {
  let pinLocal = gerarIconeVermelho();
  let coletaPin = coletas.find((item) => item.coleta == coleta);
  if (coletaPin) {
    // Verifica se já existe um marcador com o mesmo ID e remove antes de criar um novo
    let existingMarker = marcadores.find((m) => m.id == coleta);
    if (existingMarker) {
      removerPinDoMapa(existingMarker);
    }
    criarMarcador(parseFloat(coletaPin.lat), parseFloat(coletaPin.lng), map, pinLocal, coletaPin.coleta);
  } else {
    console.log("Coleta não encontrada com o número especificado:", coleta);
  }
};


const limpaRomaneio = () => {
    let tabela = document.getElementById('tabelaRomaneio');
    tabela.innerHTML = ""; // Limpa o conteúdo da tabela
  };


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
      geraLinhaRomaneio(coleta, remetente, cidade, volume, peso);
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

const removerPinDoMapa = (marcador) => {
    if (marcador) {
      marcador.setMap(null); // Remove o marcador do mapa
      const index = marcadores.indexOf(marcador);
      if (index !== -1) {
        marcadores.splice(index, 1); // Remove o marcador do array 'marcadores'
      }
    }
  };

  const escapeHtml = (unsafe) => {
    if (!unsafe.replace) return unsafe;
    return unsafe.replace(/[&<"']/g, (m) => {
      switch (m) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '"':
          return '&quot;';
        default:
          return '&#039;';
      }
    });
  };
  