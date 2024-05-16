import { BASE_URL } from "../../config";
const handleFormSubmit = (data, navigation, handleSubmitError) => {

    const url = `${BASE_URL}/login`;
  
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
  .then(responseData => {
    // Handle successful authentication
    console.log("Authentication successful:", responseData);
    // Navigate to the home screen
    navigation.navigate("Home");
  })
  .catch(handleSubmitError)
  .finally(() => {
    // Reset the loading state
  });
};

export default handleFormSubmit;