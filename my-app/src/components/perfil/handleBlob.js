import { Blob } from 'rn-fetch-blob';
import { BASE_URL } from '../config.js';

const url = `${BASE_URL}/`;

const uploadImage = async (uri) => {
    const apiUrl = url;
    const formData = new FormData();
    const blob = await Blob.fromUri(uri);
    const fileType = blob.filename.split('.').pop(); // extrair exteçao do arquivo .jpeg .png etc
    formData.append('image', {
      uri,
      type: `image/${fileType}`, // definir extenção baseado no tipo de arquivo que o usuario enviar
      name: `image.${fileType}`,
    });

    const config = {
      headers: {
        'Content-Type': 'ultipart/form-data',
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: config.headers,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };