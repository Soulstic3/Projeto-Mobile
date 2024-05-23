import { BASE_URL } from '../../config.js';
import * as ImagePicker from 'expo-image-picker';


const handleImagePicker = async () => {
  const url = `${BASE_URL}/upload-image`; 
  const result = await ImagePicker.launchImageLibraryAsync({
    aspect: [4, 4],
    allowsEditing: true,
    base64: true,
    quality: 1,
  });

  if (!result.canceled) {
    const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
    const formData = new FormData();
    formData.append('image', base64Image);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData, //buffer
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
        setImage(data.imageUrl); // Update the state with the uploaded image URL
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};

export default handleImagePicker;