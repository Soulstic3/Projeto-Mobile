import { BASE_URL } from '../../config.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const fetchUserData = async (userId) => {
    const url = `${BASE_URL}/users/perfil`; 
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    numero_cadsus: '',
    sexo: '',
    telefone: '',
    endereço: '',
    bairro: '',
    cep: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return userData;
};

export default fetchUserData;