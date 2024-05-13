import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from '../components/home';
import Main from '../components/main';
import Title from '../components/title';
import Atualizar from '../components/atualizar';
import Cadastro from '../components/cadastro';

const Stack = createNativeStackNavigator();



function Login() {
    return (
      <View style={styles.container}>
        <Title />
        <Main />
      </View>
    );
  }
  
  export default function TabRoutes() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{headerShown: false}}
        />
        <Stack.Screen
          name='Atualizar'
          component={Atualizar}
          options={{ headerShown: false}}
          />
      </Stack.Navigator>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3970C9',
      paddingTop: 80
    }
  });