const geraMapa = (locations)=>{
    var map = L.map('map').setView([-23.550520, -46.633308], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var markers = []; // Array para armazenar os marcadores

    // Ícones personalizados
    var redIcon = L.icon({
        iconUrl: 'img/pin-vermelho.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });
  
      var blueIcon = L.icon({
        iconUrl:'img/pin-vermelho.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });
  

    // Adiciona marcadores ao mapa
    locations.forEach(function(location) {
      console.log(locations)
      var marker = L.marker([location.lat, location.lng], { icon: redIcon }).addTo(map);

      // Informações exibidas ao passar o mouse sobre o marcador
      marker.bindPopup(location.coleta);

      // Verifica se há sobreposição com outro marcador
      var overlappingMarker = markers.find(function(existingMarker) {
        return existingMarker.getLatLng().equals(marker.getLatLng());
      });

      if (overlappingMarker) {
        // Se houver sobreposição, adicione um aviso
        marker.bindTooltip('Existem mais de uma coleta nessa localidade').openTooltip();
      }

      // Armazena o marcador no array
      markers.push(marker);

      // Exibir menu de opções ao clicar com o botão direito do mouse
      marker.on('contextmenu', function(e) {
        e.originalEvent.preventDefault(); // Impede o menu de contexto padrão

        var options = [
          {
            label: 'Remover',
            action: function() {
              map.removeLayer(marker);
            }
          },
          {
            label: 'Detalhes',
            action: function() {
              alert(`Coleta nº ${location.coleta} | Volumes ${location.volumes} | Peso ${location.peso}`);
            }
          }
        ];

        var menu = L.popup()
          .setLatLng(e.latlng)
          .setContent(generateMenuHtml(options))
          .openOn(map);

        // Captura o evento de clique em cada opção do menu
        options.forEach(function(option, index) {
          var element = document.getElementById('menu-option-' + index);
          element.addEventListener('click', function() {
            option.action();
            map.closePopup(menu);
          });
        });
      });
    });
}

// Função auxiliar para gerar o HTML do menu de opções
function generateMenuHtml(options) {
    var html = '<ul>';
    options.forEach(function(option, index) {
        html += '<li><a id="menu-option-' + index + '" href="#">' + option.label + '</a></li>';
    });
    html += '</ul>';
    return html;
    }