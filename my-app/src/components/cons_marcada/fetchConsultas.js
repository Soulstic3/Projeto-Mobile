const token = 'SEU_TOKEN_DE_AUTENTICACAO'; // Substitua com o token de autenticação do usuário
import { BASE_URL } from "../../config";

const handleFormSubmit = (data, navigation ) => {
    
const url = `${BASE_URL}/exibirTodas`;
fetch(url, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  if (!response.ok) {
    throw new Error('Erro na requisição');
  }
  return response.json();
})
.then(data => {
  const consultas = data;
  console.log(consultas); // Consultas do usuário autenticado
})
.catch(error => {
  console.error(error);
})};