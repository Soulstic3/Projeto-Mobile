import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {BASE_URL} from '../../config';


const url = `${BASE_URL}/consulta/cancelarUltimaConsulta`;
// Modal de Consulta
const ConsultaModal = ({ handleClose, handleOKPress }) => (
    <View style={styles.content}>
        <Text style={styles.title}>
            Sua consulta foi marcada! Clique em "OK" para visualizar suas consultas marcadas.
        </Text>
        <View style={styles.buttonArea}>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
                <Text style={styles.tamanhoText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cor]} onPress={handleOKPress}>
                <Text style={styles.tamanhoText}>OK</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// Modal de Cancelamento
const CancelarModal = ({ handleClose, handleCancelPress, textInputRef, text, setText, handlePressIn }) => (
    <View style={styles.content2}>
        <Text style={styles.title2}>
            Deseja realmente cancelar a consulta?
        </Text>
       
        <View style={styles.buttonArea2}>
            <TouchableOpacity style={styles.button2} onPress={handleClose}>
                <Text style={styles.texto2}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleCancelPress}>
                <Text style={[styles.texto2, styles.cor2]}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export function ModalConsulta({ handleClose, activeModal }){
    const navigation = useNavigation();

    const [dateInputValue, setDateInputValue] = useState(''); // texto do placeholder destacado de preto
   

    const [text, setText] = useState('');
    const textInputRef = useRef(null);
  
    const handlePressIn = (event) => {
        const { locationX } = event.nativeEvent;
        const averageCharacterWidth = 7; // Ajuste para uma largura média mais realista dos caracteres
        const position = Math.round(locationX / averageCharacterWidth);
    
        if (textInputRef.current) {
          textInputRef.current.setNativeProps({ selection: { start: position, end: position } });
        }
      };


    const handleOKPress = () => {
        // Aqui você pode redirecionar para a página desejada
        navigation.navigate("ConsMarcada");
        handleClose(); // Fecha o modal após redirecionar
    };

   

    const handleCancelPress = () => {
        const handleSubmitError = (error) => {
            console.error('Error sending request:', error);
            if (error.json) {
              error.json().then((errorMessage) => {
                Alert.alert('Erro', errorMessage.message);
              });
            } else {
              Alert.alert('Erro', 'Erro ao enviar solicitação');
            }
          };
        fetch(url, {        
            method: 'DELETE',
            redirect: 'follow'   
            },
          )
          .then(response => {      // pegar resposta da api
            if (!response.ok) {
              throw response
              
            }
            return response.json();
          })
          .then((responseData) => {      // se tudo der certo mostrar alerta ( o then só é executado quando todo 
            if (responseData.error) {
              throw new Error(responseData.error);
            } else {
                console.log('Consulta cancelada!');

                handleClose(); // Feche o modal após cancelar
            }
          })
          .catch(handleSubmitError)
        };
    return(
        <View style={styles.container}>
            {activeModal === 'consulta' && (
                <ConsultaModal handleClose={handleClose} handleOKPress={handleOKPress} />

            )}

            {activeModal === 'cancelar' && (
                <CancelarModal 
                handleClose={handleClose} 
                handleCancelPress={handleCancelPress} 
                textInputRef={textInputRef}
                text={text}
                setText={setText}
                handlePressIn={handlePressIn}
                />

            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // COR DE FUNDO
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },

        //BOTAO POPUP MARCAR CONSULTA
        content: {
            backgroundColor: "#F3F3FF",
            width: "80%", //largura
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8, //cincunferencia da borda
            elevation: 10, // sombra para destacar o modal
            fontWeight: "bold"

        },
        title: {
            fontSize: 20, // tamanho da fonte
            marginBottom: 30,
            textAlign: "left",
            width: "92%",
            fontWeight: "black"
        },
        texto:{
            fontSize: 16,
            marginBottom: 10,
            width: "90%"
        },
        buttonArea: {
            flexDirection: "row", //botoes um ao lado do outro
            width: '85%', //largura
            alignItems: "center",
            justifyContent: "space-between",


            
        },
        button:{
            height: 45,
            paddingVertical: 5, // espaçamento vertical
            paddingHorizontal: 25, // espaçamento horizontal
            borderRadius: 8,
            backgroundColor: "#F3F3FF",
            borderWidth: 2, // cor da borda
            borderStyle: "solid",


        },
        cor:{
            backgroundColor: "#1E90FF",

        },
        tamanhoText:{
            fontWeight: 'black',
            fontSize: 22,
            

        },
        
            //BOTAO POPUP Cancelar

        content2:{
            backgroundColor: "#F3F3FF",
            width: "80%", //largura
            paddingTop: 20,
            paddingBottom: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8, //cincunferencia da borda
            elevation: 10, // sombra para destacar o modal
            fontWeight: "bold"
        },
        title2:{
            fontSize: 18, // tamanho da fonte
            marginBottom: 30,
            textAlign: "left",
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
            

        },
        containerDatePicker:{
            marginTop: -15,
            marginBottom: 30,
            borderColor: 'black',
            borderWidth: 2, // cor da borda
          },
          datePickerInput:{
            backgroundColor: "#FFF",
            fontWeight: '300', // texto em negrito
            fontSize: 20, // tamanho do texto dentro do input
            height: 35,
            width: 120, // largura do campo
            textAlign: "center",
            alignItems: "center",
            borderStyle: "solid",
            justifyContent: "center",
            color: 'blue' // A data, depois de selecionada, fica na cor preta.
          },
        motivoCancelamento: {
            backgroundColor: "#FFF",
            minHeight: 40,
            borderColor: 'gray',
            borderWidth: 1,
            width: "90%",
            marginTop: -20,
            marginBottom: 20,
            paddingHorizontal: 8,
        },
        texto2: {
            fontSize: 16,
            marginTop: 0,
            marginBottom: 0,
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20,


        },
        buttonArea2:{
            flexDirection: "row", //botoes um ao lado do outro
            width: '100%', //largura
            alignItems: "center",
            justifyContent: "space-between",



        },
        button2:{
            paddingVertical: 10, // espaçamento vertical
            paddingHorizontal: 30, // espaçamento horizontal
            //padding: 10, //espaçamento entre eles
        },
        cor2:{
            color: "red",

        },
        

});

export default ModalConsulta;