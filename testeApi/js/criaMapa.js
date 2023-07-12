const criarMapa = (coletasData) => {
  var mapOptions = {
    center: { lat: -23.550164466, lng: -46.633664132 },
    zoom: 10,
    mapTypeControl: false // Desabilita o controle de tipo de mapa
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Objeto para armazenar as coordenadas únicas e contadores
  var coordenadas = {};

  coletasData.forEach(coleta => {
    if (coleta.lat && coleta.lng) {
      var latitude = parseFloat(coleta.lat);
      var longitude = parseFloat(coleta.lng);
      var numeroColeta = coleta.coleta;
      var volume = coleta.volume;
      var peso = coleta.peso;

      var customIcon = {
        labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' // URL do ícone do Google Maps com a cor desejada
      };

      // Verifica se a coordenada já existe no objeto coordenadas
      var coordenada = `${latitude},${longitude}`;
      if (coordenada in coordenadas) {
        // Se a coordenada já existe, incrementa o contador e desloca o marcador
        coordenadas[coordenada]++;
        latitude += (coordenadas[coordenada] * 0.0001); // Ajuste o valor 0.0001 para controlar o deslocamento dos pins
        longitude += (coordenadas[coordenada] * 0.0001); // Ajuste o valor 0.0001 para controlar o deslocamento dos pins
      }  else {
        // Se a coordenada ainda não existe, define o contador como 1 e cria um ícone personalizado para a localidade
        coordenadas[coordenada] = 1;
        customIcon = {
          labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' // URL do ícone do Google Maps com outra cor desejada
        };
      }

      var marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        icon: customIcon
      });

      var infoWindow = new google.maps.InfoWindow({
        content: `Remetente: ${coleta.remetente}<br>
                  Endereço: ${coleta.endereco}<br>
                  Cidade: ${coleta.cidade}-${coleta.estado}<br>
                  Numero da Coleta: ${numeroColeta}<br>
                  volumes: ${volume} Peso:${peso}<br><br>

                  <button class="btn-primary">adicionar a rota</button>`
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
        console.log(`Marcador ${numeroColeta} clicado`);
      });
    }
  });

  geraRomaneio();

}

const limpaMapa = () => {
  let mapa = document.getElementById('map')
  let html = ''
  mapa.innerHTML = html
}
