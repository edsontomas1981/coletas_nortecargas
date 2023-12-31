function criarRomaneioNaSessao(motorista, placaVeiculo, tipoVeiculo) {
  let numRomaneio = geraNumeroRomaneio()
  // Obter o objeto de romaneios da sessão ou um objeto vazio, se não houver romaneios ainda
  JSON.parse(sessionStorage.getItem(numRomaneio)) || {};

  // Criar o objeto 'romaneio' com as informações iniciais vazias
  const romaneio = {
    motorista: motorista,
    placaVeiculo: placaVeiculo,
    tipoVeiculo: tipoVeiculo,
    coletas: []
  };

  // Armazenar o objeto de romaneios atualizado na sessão
  sessionStorage.setItem(numRomaneio, JSON.stringify(romaneio));
}

// Função para obter o objeto de romaneio pelo número do romaneio na sessão
function obterRomaneioPeloNumero(numeroRomaneio) {
  const romaneios = JSON.parse(sessionStorage.getItem(numeroRomaneio));
  console.log(romaneios)
  return romaneios;
}

const getNumRomaneio=()=>{
  let numRomaneio = document.getElementById('numRomaneio')
  return numRomaneio.textContent
}

const geraNumeroRomaneio = ()=>{
  let dataAtual = new Date();
  // Obtendo os valores individuais da data
  let dia = String(dataAtual.getDate()).padStart(2, '0'); // Retorna o dia do mês (01-31)
  let mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Retorna o mês (01-12)
  let horas = String(dataAtual.getHours()).padStart(2, '0'); // Retorna as horas (00-23)
  let minutos = String(dataAtual.getMinutes()).padStart(2, '0'); // Retorna os minutos (00-59)
  let segundos = String(dataAtual.getSeconds()).padStart(2, '0'); // Retorna os segundos (00-59)
  let numero = dia+mes+horas+minutos+segundos
  console.log(typeof(numero))
  preencheNumRomaneio(numero);
  return numero
}

const preencheNumRomaneio = (numero)=>{
    let numRomaneio = document.getElementById('numRomaneio')
    numRomaneio.textContent = numero
}

document.getElementById('btnCriaRomaneio').addEventListener('click',()=>{
  let motorista = document.getElementById('motorista')
  let placa = document.getElementById('placa')
  let veiculo = document.getElementById('veiculo').selectedOptions[0].textContent
  criarRomaneioNaSessao(motorista.value,placa.value,veiculo);

});

const geraLinhaRomaneio = (coleta, remetente, cidade, volume, peso) => {
  const linha = document.createElement('tr');
  linha.dataset.coleta = coleta; // Adiciona o atributo data-coleta à linha

  const celula1 = document.createElement('td');
  const celula2 = document.createElement('td');
  const celula3 = document.createElement('td');
  const celula4 = document.createElement('td');
  const celula5 = document.createElement('td');

  // Escapa o valor da coleta para evitar problemas de segurança
  const coletaEscaped = escapeHtml(coleta);

  celula1.innerHTML = `
    <i class="fa fa-trash" aria-hidden="true" onclick="removeRomaneio('${coletaEscaped}')"></i>
    <span>${coletaEscaped}</span>
  `;

  // Escapa os valores restantes para evitar problemas de segurança
  celula2.textContent = escapeHtml(remetente);
  celula3.textContent = escapeHtml(cidade);
  celula4.textContent = escapeHtml(volume);
  celula5.textContent = escapeHtml(peso);

  // Adicione a classe 'truncate' às células que você deseja truncar
  celula2.classList.add('truncate');
  celula3.classList.add('truncate');

  linha.appendChild(celula1);
  linha.appendChild(celula2);
  linha.appendChild(celula3);
  linha.appendChild(celula4);
  linha.appendChild(celula5);

  document.getElementById('tabelaRomaneio').appendChild(linha);
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
  