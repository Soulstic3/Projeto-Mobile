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
        throw new Error("Erro ao enviar solicitação");
      }
  
      const data = await response.json();
      // Verifique se a resposta da API requer mais ações, como verificar o token de acesso
      navigation.navigate("Home");
      
    } catch (error) {
      console.error('Error sending request:', error);
      handleSubmitError(error);
    } 
  };