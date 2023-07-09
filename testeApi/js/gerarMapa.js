
  const criaMapa = async(result)=>{
    // Cria o mapa
    var map = L.map('map').setView([-23.4743594, -46.4741434], 12);

    // Adicionar o tile layer (mapa de fundo)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(map);

    let coletasData = result

    // Adicionar marcadores para cada coleta
    coletasData.forEach(coleta => {
      if (coleta.latitude && coleta.longitude) {
        var latitude = coleta.latitude;
        var longitude = coleta.longitude;
        var numeroColeta = coleta.coleta;
        var volume = coleta.volume;
        var peso = coleta.peso;
        var marker = L.marker([latitude, longitude])
          .bindPopup(`Numero da Coleta: ${numeroColeta}<br>volumes: ${volume} Peso:${peso}`)
          .addTo(map);

        // Adicionar listener para o evento de clique
        marker.on('click', function () {
          console.log(`Marcador ${numeroColeta} clicado`);
          // Aqui você pode fazer o que quiser com o marcador clicado, por exemplo, exibir informações adicionais ou redirecionar para outra página
        });
      }
    });
  }

