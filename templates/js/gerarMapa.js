let teste=document.getElementById('gerarCoordenadas')
teste.addEventListener('click',async (e)=>{
    let dados = {'cep':'07221000'}
    let url = 'http://127.0.0.1:5000/api/dados'
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
    document.getElementById('dados').textContent = JSON.stringify(result);
})


/*
<script>
    // Fazer a solicitação à API usando o JavaScript
    fetch('http://127.0.0.1:5000/api/dados')
        .then(response => response.json())
        .then(data => {
            // Manipular os dados recebidos
            document.getElementById('dados').textContent = JSON.stringify(data);
        })
        .catch(error => {
            console.error('Erro ao obter os dados da API:', error);
        });
</script>
*/