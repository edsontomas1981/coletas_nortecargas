const geraRomaneio = ()=>{
    let romaneio = document.getElementById('relatorio')
    let html = `            
                <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
    `
    romaneio.innerHTML = html
}

const limpaRomaneio = ()=>{
    let romaneio = document.getElementById('relatorio')
    let html = ""
    romaneio.innerHTML = html
}

document.getElementById('geraRomaneio').addEventListener('click',()=>{
    let numero = criaNumRomaneio();
    let veiculo = getVeiculoSelecionado()
    let motorista = getMotoristaSelecionado()
    let coletas  = []
    let romaneioColeta = {'numero':numero,'veiculo':veiculo,'motorista':motorista,'coletas':coletas};
    preencheNumRomaneio(numero);
    sessionStorage.setItem(numero, JSON.stringify(romaneioColeta));
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

const adicionaColeta = (coleta) => {
    let dadosColeta = JSON.parse(coleta.dataset.coleta);

    // Recuperando o romaneio da sessão
    let numeroRomaneio = document.getElementById('numRomaneio').textContent;
    var romaneioColetaString = sessionStorage.getItem(parseFloat(numeroRomaneio));
    var romaneioColeta = JSON.parse(romaneioColetaString);
    
  
    // Faça as alterações necessárias no objeto do romaneio
    romaneioColeta.veiculo = getVeiculoSelecionado();
    romaneioColeta.motorista = getMotoristaSelecionado();
    romaneioColeta.coletas.push(dadosColeta);
  
    // Armazene o romaneio atualizado na sessão novamente
    sessionStorage.setItem(numeroRomaneio, JSON.stringify(romaneioColeta));
  
 
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