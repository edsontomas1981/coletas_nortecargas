var marcadores = [];
var coordenadas = {};
var circles = {}; // Usando um objeto para armazenar os círculos por mapa
var map;

const criarMapa = (coletasData) => {
  var mapOptions = {
    center: { lat: -23.550164466, lng: -46.633664132 },
    zoom: 10,
    mapTypeControl: false // Desabilita o controle de tipo de mapa
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  coletasData.forEach(coleta => {
    inseriColetasNoMapa(coleta, map);
  });
};

const limpaMapa = () => {
  let mapa = document.getElementById('map')
  let html = ''
  mapa.innerHTML = html
}

const geraIconAzul=()=>{
  let iconCustomizado={
              labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' // URL do ícone do Google Maps com a cor desejada
            };
  return iconCustomizado
}

const geraIconVermelho=()=>{
  let iconCustomizado={
                    labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' // URL do ícone do Google Maps com outra cor desejada
                  };
  return iconCustomizado
}

const menuDireito=()=>{

}

const criaMarcador = (latitude, longitude, map, pinLocal, coleta) => {
  let marcador = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    icon: pinLocal,
    id: coleta
  });

  marcadores.push(marcador); // Adiciona o marcador ao array marcadores

  return marcador;
};


const geraInformacoesColeta = (coleta, marker) => {
  let info = new google.maps.InfoWindow();
  let content = `Remetente: ${coleta.remetente}<br>
                Endereço: ${coleta.endereco}<br>
                Cidade: ${coleta.cidade}-${coleta.estado}<br>
                Numero da Coleta: ${coleta.coleta}<br>
                Volumes: ${coleta.volume} Peso:${coleta.peso}<br><br>
                <button class="btn btn-primary" data-marker="${marker.id}" data-remetente="${coleta.remetente}" 
                data-cidade="${coleta.cidade}-${coleta.estado}" id="${coleta.coleta}" data-volume=" ${coleta.volume}"
                data-peso="${coleta.peso}" data-coleta="${coleta.coleta}"
                onclick="adicionaColeta(event)">Adicionar à rota</button>
                <button class="btn btn-danger" data-marker="${marker.id}" onclick="adicionaColeta(event)">Remover</button>`;
  info.setContent(content);
  return info;
};

const inseriColetasNoMapa = (coleta,map)=>{
    if (coleta.lat && coleta.lng) {
      let latitude = parseFloat(coleta.lat);
      let longitude = parseFloat(coleta.lng);

      let pinLocal = geraIconAzul();

      // Verifica se a coordenada já existe no objeto coordenadas
      let coordenada = `${latitude},${longitude}`;

      if (coordenada in coordenadas) {
        // Se a coordenada já existe, incrementa o contador e desloca o marcador
        coordenadas[coordenada]++;
        latitude += (coordenadas[coordenada] * 0.0001); // Ajuste o valor 0.0001 para controlar o deslocamento dos pins
        longitude += (coordenadas[coordenada] * 0.0001); // Ajuste o valor 0.0001 para controlar o deslocamento dos pins
      }  else {
        // Se a coordenada ainda não existe, define o contador como 1 e cria um ícone personalizado para a localidade
        coordenadas[coordenada] = 1;
        pinLocal = geraIconVermelho()
      }

      // Dentro do loop onde os marcadores são criados
      let marker = criaMarcador(latitude,longitude,map,pinLocal,coleta.coleta)
      
      let infoWindow = geraInformacoesColeta(coleta,marker)
      // Armazene a referência ao marcador como uma propriedade do objeto infoWindow
      infoWindow.marker = marker;
      const optionInfoWindow = ()=>{
        infoWindow.open(map, marker);
      }

      let infoMenuDireito = geraMenuAcoes(coleta, marker,map)
      infoMenuDireito.marker = marker;
      const optionInfoMenuDireito = ()=>{
        infoMenuDireito.open(map, marker);
      }



      marker.addListener('click', async ()=> {
        optionInfoWindow()
      });

      // Adicionando o evento de clique direito ao marcador
      marker.addListener('rightclick', function(event) {
        optionInfoMenuDireito()
        // createCircle(parseFloat(coleta.lat), parseFloat(coleta.lng), map);
      });
  }
}


function createCircle(latitude, longitude, map) {
  var center = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
  var circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    center: center,
    radius: 2500 // Defina o raio desejado em metros
  });

  if (circles[map]) {
    circles[map].setMap(null);
  }

  circle.setMap(map);
  circles[map] = circle; // Armazena a instância do círculo para o mapa correspondente
}

const geraMenuAcoes = (coleta, marker, map) => {
  let info = new google.maps.InfoWindow();
  let content = `<ul class="list-group">
                    <li class="list-group-item" onclick="geraPerimetro(${parseFloat(coleta.lat)},${parseFloat(coleta.lng)}, map)">gERA</li>
                    <li class="list-group-item" onclick="removerPerimetro(map)">rEMOVE</li>
                 </ul>`;
  info.setContent(content);
  return info;
}

const geraPerimetro = (latitude, longitude, map) => {
  createCircle(latitude, longitude, map);
}

const removerPerimetro = (map) => {
  if (circles[map]) {
    circles[map].setMap(null);
    delete circles[map];
  }
}