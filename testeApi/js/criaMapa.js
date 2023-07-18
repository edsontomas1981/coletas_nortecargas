var marcadores = [];
var coordenadas = {};
var circles = {}; // Usando um objeto para armazenar os círculos por mapa
var map;
var infoWindow = null; // Variável para armazenar a infoWindow atual
var infoMenuDireito = null; // Variável para armazenar o infoMenuDireito atual
var coletas
var raio = 2.500

const criarMapa = (coletasData) => {
  coletas=coletasData;
  var mapOptions = {
    center: { lat: -23.550164466, lng: -46.633664132 },
    zoom: 10,
    mapTypeControl: false // Desabilita o controle de tipo de mapa
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  coletasData.forEach(coleta => {
    inserirColetaNoMapa(coleta, map);
  });
};

const limparMapa = () => {
  let mapa = document.getElementById('map');
  mapa.innerHTML = '';
}

const gerarIconeAzul = () => {
  let iconCustomizado = {
    labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' // URL do ícone do Google Maps com a cor desejada
  };
  return iconCustomizado;
}

const gerarIconeVermelho = () => {
  let iconCustomizado = {
    labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' // URL do ícone do Google Maps com outra cor desejada
  };
  return iconCustomizado;
}

const menuDireito = () => {

}

const criarMarcador = (latitude, longitude, map, pinLocal, coleta) => {
  let marcador = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    icon: pinLocal,
    id: coleta
  });

  marcadores.push(marcador); // Adiciona o marcador ao array marcadores

  return marcador;
};

const gerarInformacoesColeta = (coleta, marcador) => {
  let info = new google.maps.InfoWindow();
  let content = `Remetente: ${coleta.remetente}<br>
                Endereço: ${coleta.endereco}<br>
                Cidade: ${coleta.cidade}-${coleta.estado}<br>
                Número da Coleta: ${coleta.coleta}<br>
                Volumes: ${coleta.volume} Peso: ${coleta.peso}<br><br>
                <button class="btn btn-primary" data-marker="${marcador.id}" data-remetente="${coleta.remetente}" 
                data-cidade="${coleta.cidade}-${coleta.estado}" id="${coleta.coleta}" data-volume="${coleta.volume}"
                data-peso="${coleta.peso}" data-coleta="${coleta.coleta}"
                onclick="adicionarColeta(event)">Adicionar à rota</button>
                <button class="btn btn-danger" data-marker="${marcador.id}" onclick="adicionarColeta(event)">Remover</button>`;
  info.setContent(content);
  return info;
};

const inserirColetaNoMapa = (coleta, map) => {
  if (coleta.lat && coleta.lng) {
    let latitude = parseFloat(coleta.lat);
    let longitude = parseFloat(coleta.lng);

    let pinLocal = gerarIconeAzul();

    // Verifica se a coordenada já existe no objeto coordenadas
    let coordenada = `${latitude},${longitude}`;

    if (coordenada in coordenadas) {
      // Se a coordenada já existe, incrementa o contador e desloca o marcador
      coordenadas[coordenada]++;
      const ajuste = coordenadas[coordenada] * 0.0001; // Ajuste o valor 0.0001 para controlar o deslocamento dos pins
      [latitude, longitude] = ajustarCoordenadas(latitude, longitude, ajuste);
    } else {
      // Se a coordenada ainda não existe, define o contador como 1 e cria um ícone personalizado para a localidade
      coordenadas[coordenada] = 1;
      pinLocal = gerarIconeVermelho();
    }
    

    // Dentro do loop onde os marcadores são criados
    let marcador = criarMarcador(latitude, longitude, map, pinLocal, coleta.coleta);

    let infoWindowContent = gerarInformacoesColeta(coleta, marcador);
   
    const exibirInfoWindow = () => {
      if (infoWindow) {
        infoWindow.close(); // Fecha a infoWindow atual, se existir
      }
      infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      infoWindow.open(map, marcador);
    };

    let infoMenuDireitoContent = gerarMenuAcoes(coleta, marcador, map);
    const exibirInfoMenuDireito = () => {
      if (infoMenuDireito) {
        infoMenuDireito.close(); // Fecha o infoMenuDireito atual, se existir
      }
      infoMenuDireito = new google.maps.InfoWindow({
        content: infoMenuDireitoContent
      });
      infoMenuDireito.open(map, marcador);
    };

    marcador.addListener('click', exibirInfoWindow);

    // Adicionando o evento de clique direito ao marcador
    marcador.addListener('rightclick', function (event) {
      exibirInfoMenuDireito();
    });
  }
};

function criarCirculo(latitude, longitude, map) {
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

const gerarMenuAcoes = (coleta, marcador, map) => {
  let content = `<ul class="list-group">
                    <li class="list-group-item" onclick="gerarPerimetro(${parseFloat(coleta.lat)}, ${parseFloat(coleta.lng)}, map)">Gerar Perímetro</li>
                    <li class="list-group-item" onclick="gerarItinerarioAPartirDoPerimetro(${parseFloat(coleta.lat)}, ${parseFloat(coleta.lng)})">Gerar Itinerário a partir do Perímetro</li>
                    <li class="list-group-item" onclick="gerarItinerarioAPartirDaqui(map)">Gerar Itinerário a partir daqui</li>
                    <li class="list-group-item" onclick="removerPerimetro(map)">Remover Perímetro</li>
                 </ul>`;
  return content;
}

const gerarPerimetro = (latitude, longitude, map) => {
  criarCirculo(latitude, longitude, map);
  if (infoMenuDireito) {
    infoMenuDireito.close(); // Fecha o infoMenuDireito atual, se existir
  }
}

const removerPerimetro = (map) => {
  if (circles[map]) {
    circles[map].setMap(null);
    delete circles[map];
  }
  infoMenuDireito.close(); // Fecha o infoMenuDireito atual, se existir
}

const ajustarCoordenadas = (latitude, longitude, contador) => {
  const ajuste = contador * 0.0001;
  return [latitude + ajuste, longitude + ajuste];
};

const verificarColetasNoCirculo = (coletas, lat, lng, raio) => {
  const centroLat = parseFloat(lat);
  const centroLng = parseFloat(lng);

  return coletas.filter(coleta => {
    const coletaLat = parseFloat(coleta.lat);
    const coletaLng = parseFloat(coleta.lng);

    const distancia = calcularDistancia(centroLat, centroLng, coletaLat, coletaLng);
    if (distancia <= raio){
      geraLinhaRomaneio(coleta.coleta,coleta.remetente,coleta.cidade,coleta.volume,coleta.peso)
      let marker = marcadores.find(m => m.id == coleta.coleta); // Encontra o marcador pelo ID
      removerPinDoMapa(marker);
    }
    return distancia <= raio;
  });
};


const calcularDistancia = (lat1, lng1, lat2, lng2) => {
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const earthRadius = 6371; // Raio da Terra em quilômetros

  const deltaLat = toRadians(lat2 - lat1);
  const deltaLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance;
};

const gerarItinerarioAPartirDoPerimetro = (lat, lng) => {
  coletas.forEach(coleta => {
    const coletasNoCirculo = verificarColetasNoCirculo([coleta], lat, lng, raio); // Passa a coleta atual dentro de um array
  });
};
