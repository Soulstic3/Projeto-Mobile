import React, { useState, } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { handleFormSubmit } from "./formHandler";
import styles from "./style";


export default function Form() {
    const navigation = useNavigation();
    
    const [cpf, setcpf] = useState(null)
    const [senha, setSenha] = useState(null)
    const [textButton, setTextButton] = useState("Acessar")
    const [textoButton, setTextoButton] = useState("Primeiro Acesso")
    const handleSubmit = () => {
        if (!cpf || !senha) {
          createAlert();
          return;
        }
    
        handleFormSubmit(
          { cpf, senha },
          navigation,
        );
      };
    const createAlert = () => Alert.alert(
        "Oops!",
        "Verifique se o campo CPF e senha estão preenchidos."
    );

    const handleSubmitError = error => {
        console.error('Error sending request:', error);
        Alert.alert('Erro', 'Erro ao enviar solicitação');
      };

    const navigateToCadastro = () => {
        navigation.navigate("Cadastro"); // Navega para a tela de cadastro
      };
    
    const navigateToHome = () => {
        navigation.navigate("Home")
    };

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.label}>Entre com seu CPF:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setcpf}
                    value={cpf}
                    placeholder="000.000.000-00"
                    keyboardType="numeric"
                />
                <Text style={styles.label}>Digite sua Senha:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Senha"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.buttonClean}
                    onPress={handleSubmit}
                >
                    <Text style={styles.textButtonClean}>{textButton}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonClean}
                    onPress={navigateToCadastro}
                >
                    <Text style={styles.textButtonClean}>{textoButton}</Text>
                </TouchableOpacity>

                
            </View>
        </View>
    )
}