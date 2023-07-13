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
    let romaneioColeta = { 'numero': numero, 'veiculo': veiculo,'motorista':motorista,'coletas':coletas };
    sessionStorage.setItem(numero, JSON.stringify(romaneioColeta));
    let novaColeta = {
        'numeroColeta': 'C001',
        'endereco': 'Rua A, 123',
        'destinatario': 'João Silva'
      };
    adicionaColeta('13713351',novaColeta)
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

const adicionaColeta=(numeroRomaneio,coleta)=> {
    // Recuperando o romaneio da sessão
    var romaneioColetaString = sessionStorage.getItem(numeroRomaneio);
    var romaneioColeta = JSON.parse(romaneioColetaString);

    // Faça as alterações necessárias no objeto do romaneio
    romaneioColeta.veiculo = 'Novo Veículo';
    romaneioColeta.motorista = 'Novo Motorista';
    romaneioColeta.coletas.push(coleta);

    // Armazene o romaneio atualizado na sessão novamente
    sessionStorage.setItem(numeroRomaneio, JSON.stringify(romaneioColeta));
    console.log(romaneioColeta)
  }

const criaNumRomaneio = ()=>{
    let dataAtual = new Date();
// Obtendo os valores individuais da data
    var dia = String(dataAtual.getDate()).padStart(2, '0'); // Retorna o dia do mês (01-31)
    var mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Retorna o mês (01-12)
    var horas = String(dataAtual.getHours()).padStart(2, '0'); // Retorna as horas (00-23)
    var minutos = String(dataAtual.getMinutes()).padStart(2, '0'); // Retorna os minutos (00-59)
    var segundos = String(dataAtual.getSeconds()).padStart(2, '0'); // Retorna os segundos (00-59)
    let numRomaneio = dia+mes+horas+minutos+segundos
    return numRomaneio
}