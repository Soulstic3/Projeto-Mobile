import { BASE_URL } from '../../config'; // pegar url que esta salva no arquivo config.js

import { Alert } from 'react-native';

const handleFormSubmit = (data, navigation) => {

  const url = `${BASE_URL}/users/cadastro`;
  const handleSubmitError = (error) => { 
    console.error('Error sending request:', error);
    Alert.alert('Erro', 'Erro ao enviar solicitação');
  };

  fetch(url, {        // usando fetch para enviar o formulario para a api
    method: 'POST',   // metodo que é usado na api
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),  // JSON.stringify transforma os dados em um arquivo json antes de enviar
  })
  .then(response => {      // pegar resposta da api
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  })
  .then(() => {      // se tudo der certo mostrar alerta ( o then só é executado quando todo 
    //o codigo acima já foi execultado)
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate(inicial);
  })
  .catch(handleSubmitError)
};

export default handleFormSubmit;