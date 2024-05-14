const handleLocalSubmit = () => {
    const formData = new FormData(); // Create a new FormData object
    formData.append('nome', nome);
    formData.append('cpf', cpf);
    formData.append('data', data);
    formData.append('sus', sus);
    formData.append('genero', genero);
    formData.append('numero', numero);
    formData.append('senha', senha);
  
    fetch('http://localhost:3000/cadastro', { // Replace with your API endpoint
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }