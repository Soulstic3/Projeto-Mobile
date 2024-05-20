import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';




export default function App() {
    const [rua, setrua] = useState(null)
    const [bairro, setbairro] = useState(null)
    const [cep, setcep] = useState(null)
    const [complemento, setcomplemento] = useState(null)

    const handleSubmit = () => {
        handleFormSubmit({
          rua,
          bairro,
          cep,
          complemento,
        }, navigation);
      };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Nome da Rua:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setrua} // quando digitar chamar o setState
                    value={rua} // nome do valor
                />
                <Text style={styles.label}>Bairro:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setbairro} // quando digitar chamar o setState
                    value={bairro} // nome do valor
                />
                <Text style={styles.label}>CEP:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setcep} // quando digitar chamar o setState
                    value={cep} // nome do valor
                    keyboardType="numeric"
                    placeholder="Ex:R. nome da sua rua" // texto que vai aparecer dentro do input
                />
                <Text style={styles.label}>Complemento:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setcomplemento} // quando digitar chamar o setState
                    value={complemento} // nome do valor
                    placeholder="Ex:R. nome da sua rua" // texto que vai aparecer dentro do input
                />

                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3970C9"
    },
    text: {
        fontWeight: "300",
        fontSize: 20,
        marginTop: 20
    },
    dados: {
        fontWeight: "300",
        fontSize: 20,
        marginTop: 10,
        borderStyle: "solid",
        borderBottomWidth: 1,
        width: 300,
        textAlign: "center"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    titleBar: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 24,
        height: 60,
        marginBottom: 10

    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderStyle: "solid",
        borderWidth: 1

    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    formContainer: {
        backgroundColor: "#fff",
        margin: 10,
        paddingTop: 10,
        borderRadius: 10,
        paddingBottom: 20,
        alignItems: "center"
    },
    botao: {
        marginTop: 30,
        width: 300,
        alignSelf: "center",
    }
});