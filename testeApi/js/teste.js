function adicionarColeta() {
  // Aqui você deve implementar a lógica para adicionar uma nova coleta no mapa
  // Pode ser necessário exibir um formulário para o usuário preencher os dados da coleta,
  // obter as coordenadas da coleta a partir do mapa ou de um serviço de geocodificação, etc.
  // Depois de obter os dados da coleta, você pode usar os métodos da classe Mapa para
  // criar um marcador para a nova coleta e adicioná-la ao mapa.

  // Exemplo de código para adicionar um marcador em uma coordenada específica:
  const novaColeta = {
    coleta: 'NovaColeta123',
    lat: -23.500,
    lng: -46.600,
    remetente: 'Remetente da Nova Coleta',
    endereco: 'Endereço da Nova Coleta',
    cidade: 'Cidade',
    estado: 'SP',
    volume: 2,
    peso: 5
  };

  console.log(mapa)

  if (mapa) {
    mapa.inserirColetaNoMapa(novaColeta, mapa.map);
  } else {
    console.log("Instância do mapa não encontrada.");
  }

}

// Adicione o evento de clique ao botão após o carregamento completo da página
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnInserirColeta').addEventListener('click', adicionarColeta);
});