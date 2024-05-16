import { BASE_URL } from '../../config';

import { Alert } from 'react-native';

const handleFormSubmit = (data, navigation) => {

  const url = `${BASE_URL}/cadastro`;
  const handleSubmitError = (error) => {
    console.error('Error sending request:', error);
    Alert.alert('Erro', 'Erro ao enviar solicitação');
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.json();
  })
  .then(() => {
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  })
  .catch(handleSubmitError)
  .finally(() => {
    navigation.goBack();
  });
};

export default handleFormSubmit;