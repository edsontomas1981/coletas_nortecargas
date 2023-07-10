const criarMapa=(coletasData)=> {
    var mapOptions = {
      center: { lat: -23.550164466, lng: -46.633664132 },
      zoom: 10,
      mapTypeControl: false // Desabilita o controle de tipo de mapa
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    coletasData.forEach(coleta => {
      if (coleta.lat && coleta.lng) {
        var latitude = coleta.lat;
        var longitude = coleta.lng;
        var numeroColeta = coleta.coleta;
        var volume = coleta.volume;
        var peso = coleta.peso;

        var marker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map
        });

        var infoWindow = new google.maps.InfoWindow({
          content: `Numero da Coleta: ${numeroColeta}<br>
                    volumes: ${volume} Peso:${peso}`
        });

        marker.addListener('mouseover', function () {
          infoWindow.open(map, marker);
          console.log(`Marcador ${numeroColeta} clicado`);
        });

        marker.addListener('click', function () {
          infoWindow.open(map, marker);
          console.log(`Marcador ${numeroColeta} clicado`);
        });
      }
    });
  }
