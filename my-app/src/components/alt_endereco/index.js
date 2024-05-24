import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import handleFormSubmit from './formHandler';
import { useNavigation } from '@react-navigation/native';
import { cepApplyMask } from "@../../../utils/mask"


export default function App() {
    const navigation = useNavigation();
    const [enderecoReq, setEnderecoReq] = useState(null)
    const [bairro, setBairro] = useState(null)
    const [cep, setCep] = useState(null)
    const [complemento, setComplemento] = useState(null)

    function applyMaskCEP (value) {
        const onlyNumbers = value.replace(/\D/g, "")
        if(onlyNumbers.length === 11){
          const cep = cepApplyMask(onlyNumbers)
          return setCep(cep)
        }else{
          setCep(value);
        }
      }

    const handleSubmit = () => {
        handleFormSubmit({
          enderecoReq,
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
                    onChangeText={setEnderecoReq} 
                    value={enderecoReq} 
                    placeholder="Ex:R. nome da sua rua"
                    />
                <Text style={styles.label}>Bairro:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setBairro} 
                    value={bairro} 
                    placeholder="Ex: Alto do Moura"
                    />
                <Text style={styles.label}>CEP:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => applyMaskCEP(value, setCep)} 
                    value={cep} 
                    keyboardType="numeric"
                    placeholder="Ex:50000-000"
                    />
                <Text style={styles.label}>Complemento:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setComplemento} 
                    value={complemento} 
                />

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                        <Text style={styles.textData}>Salvar</Text>
                    </TouchableOpacity>
                </View>
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
    input: {
        width: "90%",
        borderRadius: 50,
        backgroundColor: "#DCDCDC",
        height: 47,
        margin: 5,
        paddingLeft: 10,
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
        marginTop: 50,
        paddingTop: 20,
        borderRadius: 10,
        paddingBottom: 20,
        alignItems: "center"
    },
    botao: {
        backgroundColor: "#1E90FF",
        width: 100,
        height: 40,
        borderRadius: 20,
      },
      textData: {
        color: "#fff",
        alignSelf: "center",
        marginTop: 10
      },
      footer: {
        marginTop: 30,
        alignSelf: "flex-start",
        margin: 5,
        bottom: 10,
      }
});