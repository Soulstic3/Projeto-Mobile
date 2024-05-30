import { Alert } from 'react-native';
import { BASE_URL } from '../../config';

export const handleFormSubmit = async ({ cpf, senha }, navigation, handleSubmitError) => {
  const url = `${BASE_URL}/users/login`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf, senha }),
    });
    
    if (!response.ok) {
      throw response;
    }
    
    const data = await response.json();
    navigation.navigate("Home");
    
  } catch (error) {
    if (error.json) {
      error.json().then(errorMessage => {
        handleSubmitError(Alert.alert(errorMessage.message));
      });
    } else {
      handleSubmitError("Erro ao enviar solicitação");
    }
    
  }
};