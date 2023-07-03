document.addEventListener('DOMContentLoaded', function() {

let teste=document.getElementById('gerarCoordenadas')
teste.addEventListener('click',async (e)=>{
    let dados = {}
    let url = 'http://127.0.0.1:5000/api/dados'
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
    console.log(result)
    // Criar o mapa
    // var map = L.map('map').setView([-22.8704172, -47.0427019], 12);
    var map = L.map('map').setView([-23.4743594, -46.4741434], 12);

    // Adicionar o tile layer (mapa de fundo)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 25,
    }).addTo(map);

    let coletasData=result
    // Adicionar marcadores para cada coleta
    coletasData.forEach(coleta => {
        if (coleta.latitude && coleta.longitude){
            var latitude = coleta.latitude;
            var longitude = coleta.longitude;
            var numeroColeta = coleta.coleta;
            var volume = coleta.volume;
            var peso = coleta.peso;
            var marker = L.marker([latitude, longitude])
                .bindPopup(`Numero da Coleta: ${numeroColeta}<br>volumes: ${volume} Peso:${peso}`)
                .addTo(map);

            // Adicionar listener para o evento de clique
            marker.on('click', function() {
                console.log(`Marcador ${numeroColeta} clicado`);
                // Aqui você pode fazer o que quiser com o marcador clicado, por exemplo, exibir informações adicionais ou redirecionar para outra página
            });
        }
    });
    

})
});
