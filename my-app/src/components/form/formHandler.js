import { BASE_URL } from "../../config";

export const handleFormSubmit = async (credentials, navigation, handleSubmitError) => {
        const url = `${BASE_URL}/login`;
        console.log(credentials)
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || 'Failed to login');
          }
      
          // handle successful login
          console.log('Login successful:', data);
          navigation.navigate('Home'); // replace 'Home' with the name of your home screen
        } catch (error) {
          handleSubmitError(error);
        }
      };