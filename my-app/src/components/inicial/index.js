import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { ModalConsulta } from '../modal/index';
export function Inicial() {
  const [modalVisible, setModalVisible] = useState(false);

  const exibirPopup = () => {
    setModalVisible(true);
  };

  return (
  <View style={styles.container}>
    <View style={styles.titulo}>
      <Text style={styles.tituloG}>Marque sua consulta</Text>
    </View>
  
    <View style={styles.texto}>
      <Text style={styles.textoG}>Tipo da consulta:</Text> 
      <Text style={styles.textoG}>Data da consulta:</Text>
      <Text style={styles.textoG}>Horário:</Text>
    </View>


    <TouchableOpacity 
      style={styles.button} 
      onPress={exibirPopup}
    >
      <Text style={styles.buttonText}>Marcar</Text>
    </TouchableOpacity>

    <Modal visible={modalVisible} animationType='fade' transparent={true}>
      <ModalConsulta handleClose={ () => setModalVisible(false) }/>
    </Modal>

  </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1, //preencher a tela inteira
    backgroundColor: "#F3F3FF",
    justifyContent: 'center', //alinha na vertical
    alignItems: 'center' //alinha na horizontal
  },
  titulo: {
    justifyContent: 'center', //alinha na vertical
    alignItems: 'center', //alinha na horizontal
    marginBottom: 10
  },
  tituloG:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  texto: {
    alignItems: 'flex-start', //alinha na horizontal
    marginTop: 100,
    marginBottom: 200,
    //marginRight: 150, // texto a esquerda
    width: "80%",
    backgroundColor: "#f3f3"
  },
  textoG:{
    fontSize: 25, // tamanho do texto
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8, // borda arredondada
    marginTop: 50
  },
  buttonText: {
    color: "#FFF",
    fontSize: 25 // tamanho do texto
  }
});

export default Inicial;

/*
function MyComponent() {
  let colorScheme = useColorScheme();

  if (colorScheme === 'dark') {
    // render some dark thing
  } else {
    // render some light thing
  }
}
*/