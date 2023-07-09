class APIConnection {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
  
    async enviarDados(dados) {
      try {
        const response = await fetch(`${this.apiUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
        });
        
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados');
        }
        
        const resposta = await response.json();
        return resposta;
      } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error;
      }
    }
  
    async receberDados() {
      try {
        const response = await fetch(`${this.apiUrl}`);
        
        if (!response.ok) {
          throw new Error('Erro ao receber os dados');
        }
        
        const dados = await response.json();
        return dados;
      } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error;
      }
    }

    async enviarArquivo(arquivo) {
        try {
          const formData = new FormData();
          formData.append('arquivo', arquivo);
    
          const response = await fetch(`${this.apiUrl}`, {
            method: 'POST',
            body: formData
          });
    
          if (!response.ok) {
            throw new Error('Erro ao enviar o arquivo');
          }
    
          const resposta = await response.json();
          return resposta;
        } catch (error) {
          console.error('Ocorreu um erro:', error);
          throw error;
        }
      }
  }



  const criarMapa = async(result)=>{

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
      if (coleta.lat && coleta.lng) {
        var latitude = coleta.lat;
        var longitude = coleta.lng;
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
