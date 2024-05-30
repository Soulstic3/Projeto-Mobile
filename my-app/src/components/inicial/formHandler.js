import { BASE_URL } from '../../config'; // pegar url que esta salva no arquivo config.js
import { Alert } from 'react-native';
import { openModal } from './index';

const handleFormSubmit = (data, callback) => {


  const url = `${BASE_URL}/consulta/agendar`;
  const handleSubmitError = (error) => {
    if (error.json) {
      error.json().then((errorMessage) => {
        Alert.alert('Erro', errorMessage.message || 'Erro ao realizar cadastro verifique seus dados');
      });
    } else {
      Alert.alert('Erro', 'Erro ao enviar solicitação');
    }
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
      throw response
      
    }
    return response.json();
  })
  .then((responseData) => {      // se tudo der certo mostrar alerta ( o then só é executado quando todo 
    if (responseData.error) {
      throw new Error(responseData.error);
    } else {
     callback();
    }
  })
  .catch(handleSubmitError)
};

export default handleFormSubmit;