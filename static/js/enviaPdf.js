let enviaPdf = document.getElementById('enviaPdf');
enviaPdf.addEventListener('click', (e) => {
    e.preventDefault();
    let formulario = document.getElementById('formulario');
    let formData = new FormData(formulario);

    // Criar elemento de loader
    let loader = document.createElement('div');
    loader.classList.add('loader');
    document.body.appendChild(loader);

    // Desabilitar botão de envio
    enviaPdf.disabled = true;

    fetch('/', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            // Remover elemento de loader
            document.body.removeChild(loader);

            // Habilitar botão de envio
            enviaPdf.disabled = false;

            // Use os dados do JSON
            console.log(data);
        })
        .catch(error => {
            // Remover elemento de loader em caso de erro
            document.body.removeChild(loader);

            // Habilitar botão de envio
            enviaPdf.disabled = false;

            // Tratar o erro
            console.error(error);
        });
});
