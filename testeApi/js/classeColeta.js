var mapa
// Declara a variável mapa no escopo global para torná-la acessível em toda a aplicação
class Mapa {
  constructor() {
    this.marcadores = [];
    this.coordenadas = {};
    this.circles = {};
    this.lines = [];
    this.map = null;
    this.infoWindow = null;
    this.infoMenuDireito = null;
    this.coletas = [];
    this.raio = 2500;
  }

  getColetaInColetas(coletaId) {
    let index = this.coletas.findIndex((item) => item.coleta == coletaId);
    let coleta = this.coletas.splice(index, 1);
    return coleta;
  }

  criarMapa = async (coletasData) => {
    this.coletas = coletasData;
    console.log(coletasData);
    var mapOptions = {
      center: { lat: -23.550164466, lng: -46.633664132 },
      zoom: 10,
      mapTypeControl: false, // Desabilita o controle de tipo de mapa
    };
    this.map = await new google.maps.Map(
      document.getElementById('map'),
      mapOptions
    );

    coletasData.forEach((coleta) => {
      this.inserirColetaNoMapa(coleta);
    });
    this.adicionarMarcadorOrigem();
  };

  limparMapa = () => {
    let mapa = document.getElementById('map');
    mapa.innerHTML = '';
    this.marcadores = [];
    this.coordenadas = {};
    this.circles = {};
    this.lines.forEach((line) => line.setMap(null));
    this.lines = [];
    if (this.infoWindow) {
      this.infoWindow.close();
      this.infoWindow = null;
    }
    if (this.infoMenuDireito) {
      this.infoMenuDireito.close();
      this.infoMenuDireito = null;
    }
  };

  gerarIconeAzul = () => {
    let iconCustomizado = {
      labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
      url: 'img/pinColeta2.png', // https://maps.google.com/mapfiles/ms/icons/red-dot.png URL do ícone do Google Maps com outra cor desejada
      scaledSize: new google.maps.Size(17, 19),
    };
    return iconCustomizado;
  };

  gerarIconeVerde = () => {
    let iconCustomizado = {
      labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
      url: 'img/pinColetaVerde.png', // https://maps.google.com/mapfiles/ms/icons/red-dot.png URL do ícone do Google Maps com outra cor desejada
      scaledSize: new google.maps.Size(25, 25),
    };
    return iconCustomizado;
  };

  gerarIconeOrigem = () => {
    let iconCustomizado = {
      labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
      url: 'img/pngTruck.png', // URL do ícone do Google Maps com a cor desejada
      scaledSize: new google.maps.Size(40, 30), // Define o tamanho do ícone (metade do tamanho original)
    };
    return iconCustomizado;
  };

  gerarIconeVermelho = () => {
    let iconCustomizado = {
      labelOrigin: new google.maps.Point(11, 50), // Define a posição do rótulo do ícone
      url: 'img/pinColeta.png', // https://maps.google.com/mapfiles/ms/icons/red-dot.png URL do ícone do Google Maps com outra cor desejada
      scaledSize: new google.maps.Size(15, 17),
    };
    return iconCustomizado;
  };

  mudarIconeParaVerde = (coleta) => {
    console.log(coleta);
    if (coleta.marcador) {
      // Obtém o ícone azul gerado pela função gerarIconeAzul
      const pinVerde = this.gerarIconeVerde();

      // Atualiza o ícone do marcador para o ícone azul
      coleta.marcador.setIcon(pinVerde);
    }
  };

  criarMarcador = (latitude, longitude, map, pinLocal, coleta) => {
    let coordenada = `${latitude},${longitude}`;
  
    if (coordenada in this.coordenadas) {
      // Se a coordenada já existe, incrementa o contador e desloca o marcador
      this.coordenadas[coordenada]++;
  
      [latitude, longitude] = this.ajustarCoordenadas(latitude, longitude);
    } else {
      // Se a coordenada ainda não existe, define o contador como 1 e cria um ícone personalizado para a localidade
      this.coordenadas[coordenada] = 1;
      pinLocal = this.gerarIconeVermelho();
    }

    console.log(coleta)
  
    let marcador = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      icon: pinLocal,
      id: coleta.coleta
    });
  
    marcador.addListener('click', () => {
      this.exibirInfoWindow(marcador);
    });
  
    // Adicionando o evento de clique direito ao marcador
    marcador.addListener('rightclick', () => {
      this.exibirInfoMenuDireito(marcador);
    });
  
    this.marcadores.push(marcador); // Adiciona o marcador ao array marcadores
  
    return marcador;
  };
  

  criarMarcadorOrigem = (latitude, longitude, map, pinLocal) => {
    let marcador = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
      icon: pinLocal,
      id: 'Matriz',
    });
    return marcador;
  };

  gerarInformacoesColeta = (coleta, marcador) => {
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

  exibirInfoWindow = (marcador) => {
    let coleta = this.coletas.find((item) => item.coleta == marcador.id);
    if (coleta) {
      if (this.infoWindow) {
        this.infoWindow.close(); // Fecha a infoWindow atual, se existir
      }
      this.infoWindow = this.gerarInformacoesColeta(coleta, marcador);
      this.infoWindow.open(this.map, marcador);
    }
  };

  inserirColetaNoMapa = (coleta) => {
    if (coleta.lat && coleta.lng) {
      let latitude = parseFloat(coleta.lat);
      let longitude = parseFloat(coleta.lng);

      let pinLocal = this.gerarIconeAzul();

      // Dentro do loop onde os marcadores são criados
      let marcador = this.criarMarcador(
        latitude,
        longitude,
        this.map,
        pinLocal,
        coleta.coleta
      );

      // Salva a referência do marcador no objeto da coleta para uso futuro
      coleta.marcador = marcador;
    }
  };

  criarCirculo = (latitude, longitude, map) => {
    var center = new google.maps.LatLng(
      parseFloat(latitude),
      parseFloat(longitude)
    );
    var circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      center: center,
      radius: this.raio, // Defina o raio desejado em metros
    });

    if (this.circles[map]) {
      this.circles[map].setMap(null);
    }

    circle.setMap(map);
    this.circles[map] = circle; // Armazena a instância do círculo para o mapa correspondente
  };

  gerarMenuAcoes = (coleta, marcador) => {
    let content = `<ul class="list-group">
                    <li class="list-group-item" onclick="gerarPerimetro(${parseFloat(
                      coleta.lat
                    )}, ${parseFloat(coleta.lng)}, map)">Gerar Perímetro</li>
                    <li class="list-group-item" onclick="gerarItinerarioAPartirDoPerimetro(${parseFloat(
                      coleta.lat
                    )}, ${parseFloat(coleta.lng)})">Gerar Itinerário a partir do Perímetro</li>
                    <li class="list-group-item" onclick="gerarIntinerarioAteAqui(${marcador.id})">Gerar Itinerário até aqui</li>
                    <li class="list-group-item" onclick="removerPerimetro(map)">Remover Perímetro</li>
                 </ul>`;
    return content;
  };

  exibirInfoMenuDireito = (marcador) => {
    if (marcador) {
      let coleta = this.coletas.find((item) => item.coleta == marcador.id);
      if (coleta) {
        if (this.infoMenuDireito) {
          this.infoMenuDireito.close(); // Fecha o infoMenuDireito atual, se existir
        }
        this.infoMenuDireito = new google.maps.InfoWindow({
          content: this.gerarMenuAcoes(coleta, marcador),
        });
        this.infoMenuDireito.open(this.map, marcador);
      }
    }
  };

  gerarIntinerarioAteAqui = (marcadorId) => {
    let latitudeOrigem = -23.473615932489814;
    let longitudeOrigem = -46.473314721518726;

    let marcadorOrigem = this.criarMarcador(
      latitudeOrigem,
      longitudeOrigem,
      this.map,
      this.gerarIconeVerde(),
      'Origem'
    );

    if (!marcadorOrigem) return;
    let marcadorDestino = this.marcadores.find((m) => m.id === marcadorId); //Gera

    if (marcadorDestino) {
      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);

      let request = {
        origin: marcadorOrigem.position,
        destination: marcadorDestino.position,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          // Marcando coletas que estão no percurso
          this.verificarColetasNoPercurso(result);
        }
      });
    }
    this.infoMenuDireito.close(); // Fecha o infoMenuDireito atual, se existir
  };

  verificarColetasNoPercurso = (routeResult) => {
    // Extrair os pontos da rota
    const routePoints = routeResult.routes[0].overview_path;

    // Loop através das coletas para verificar se estão dentro do raio do percurso
    this.coletas.forEach((coleta) => {
      const coletaLat = parseFloat(coleta.lat);
      const coletaLng = parseFloat(coleta.lng);

      // Verificar a distância da coleta para cada ponto da rota
      for (const point of routePoints) {
        const pointLat = point.lat();
        const pointLng = point.lng();

        const distancia = this.calcularDistancia(
          coletaLat,
          coletaLng,
          pointLat,
          pointLng
        );

        if (distancia <= this.raio) {
          console.log('mudePraVerde');
          this.mudarIconeParaVerde(coleta);
          break; // Parar o loop se a coleta já estiver sido marcada
        }
      }
    });
  };

  gerarPerimetro = (latitude, longitude, map) => {
    this.criarCirculo(latitude, longitude, map);
    if (this.infoMenuDireito) {
      this.infoMenuDireito.close(); // Fecha o infoMenuDireito atual, se existir
    }
  };

  removerPerimetro = (map) => {
    if (this.circles[map]) {
      this.circles[map].setMap(null);
      delete this.circles[map];
    }
    this.infoMenuDireito.close(); // Fecha o infoMenuDireito atual, se existir
  };

  ajustarCoordenadas = (latitude, longitude) => {
    const ajuste = 0.00001;
    return [latitude + ajuste, longitude + ajuste];
  };

  verificarColetasNoCirculo = (coletas, lat, lng, raio) => {
    const centroLat = parseFloat(lat);
    const centroLng = parseFloat(lng);

    return coletas.filter((coleta) => {
      const coletaLat = parseFloat(coleta.lat);
      const coletaLng = parseFloat(coleta.lng);

      const distancia = this.calcularDistancia(
        centroLat,
        centroLng,
        coletaLat,
        coletaLng
      );
      if (distancia <= raio) {
        geraLinhaRomaneio(
          coleta.coleta,
          coleta.remetente,
          `${coleta.cidade}-${coleta.estado}`,
          coleta.volume,
          coleta.peso
        );
        let marker = this.marcadores.find((m) => m.id == coleta.coleta); // Encontra o marcador pelo ID
        this.removerPinDoMapa(marker);
      }
    });
  };

  calcularDistancia = (lat1, lng1, lat2, lng2) => {
    const toRadians = (degrees) => {
      return degrees * (Math.PI / 180);
    };

    const earthRadius = 6371; // Raio da Terra em quilômetros

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
  };

  gerarItinerarioAPartirDoPerimetro = (lat, lng) => {
    this.coletas.forEach((coleta) => {
      this.verificarColetasNoCirculo([coleta], lat, lng, this.raio); // Passa a coleta atual dentro de um array
    });
  };

  adicionarMarcadorOrigem = ()=> {
    // ,
    let latitudeOrigem = -23.473683815599315;
    let longitudeOrigem = -46.47333115093511;

    let marcadorOrigem = this.criarMarcador(
      latitudeOrigem,
      longitudeOrigem,
      this.map,
      this.gerarIconeOrigem(),'Origem'  );
  };

  recolocarPinNoMapa = (coleta) => {
    let pinLocal = this.gerarIconeVermelho();
    let coletaPin = this.coletas.find((item) => item.coleta == coleta);
    if (coletaPin) {
      // Verifica se já existe um marcador com o mesmo ID e remove antes de criar um novo
      let existingMarker = this.marcadores.find((m) => m.id == coleta);
      if (existingMarker) {
        this.removerPinDoMapa(existingMarker);
      }
      this.criarMarcador(
        parseFloat(coletaPin.lat),
        parseFloat(coletaPin.lng),
        this.map,
        pinLocal,
        coletaPin.coleta
      );
    } else {
      console.log(
        'Coleta não encontrada com o número especificado:',
        coleta
      );
    }
  };

  removerPinDoMapa = (marker) => {
    if (marker) {
      marker.setMap(null);
      let index = this.marcadores.indexOf(marker);
      if (index > -1) {
        this.marcadores.splice(index, 1);
      }
    }
  };

  atualizarMarcador = (coleta) => {
    let coletaPin = this.coletas.find((item) => item.coleta == coleta);
    if (coletaPin) {
      let marker = this.marcadores.find((m) => m.id == coleta);
      if (marker) {
        marker.setPosition({
          lat: parseFloat(coletaPin.lat),
          lng: parseFloat(coletaPin.lng),
        });
      } else {
        console.log(
          'Marcador não encontrado para a coleta:',
          coleta
        );
      }
    } else {
      console.log(
        'Coleta não encontrada com o número especificado:',
        coleta
      );
    }
  };
}

function initMap() {
      // Dados das coletas obtidos do backend (por exemplo, via AJAX)
      const coletasData = [
        {
          coleta: '12345',
          remetente: 'Remetente 1',
          endereco: 'Endereço 1',
          cidade: 'Cidade 1',
          estado: 'UF 1',
          volume: '1',
          peso: '10',
          lat: '-23.473683815599315',
          lng: '-46.47333115093511',
        },
        // Mais coletas...
      ];

  mapa = new Mapa();
  mapa.criarMapa(coletasData);
}