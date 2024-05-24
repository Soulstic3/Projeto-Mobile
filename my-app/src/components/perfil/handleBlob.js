import { BASE_URL } from '../../config.js';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';

const handleImagePicker = async () => {
  const url = `${BASE_URL}/upload-image`; 
  const result = await ImagePicker.launchImageLibraryAsync({
    aspect: [4, 4], 
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const manipResult = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 400, height: 400 } }],
      { format: 'jpeg' }
    );
    
    const formData = new FormData();
    formData.append('image', {
      uri: manipResult.uri, 
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Foto de perfil alterada com sucesso!');
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};

export default handleImagePicker;