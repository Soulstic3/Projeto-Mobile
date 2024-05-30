import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { ModalConsulta } from '../modal/index';
import { ScrollView } from 'react-native-virtualized-view';
import { BASE_URL } from '../../config'; // pegar url que esta salva no arquivo config.js
import { useNavigation } from "@react-navigation/native";



export function ConsMarcada() {
  const navigation = useNavigation();
  const [consultas, setConsultas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState('none'); // Estado para controlar qual modal está aberto
  const url = `${BASE_URL}/consulta/exibirTodas`;
  const [refreshing, setRefreshing] = useState(false);

  // Estado para armazenar a data selecionada
  const exibirPopup = () => {
    setModalVisible(true);
    setActiveModal('cancelar'); // Define o modal de consulta como ativo
  };

  const atualizarConsultas = () => {
    fetch(url)
      .then(response => response.json())
      .then(data => setConsultas(data));
  };

  const handleRefresh = () => {
    setRefreshing(true)
    atualizarConsultas()
    setRefreshing(false)
  };

  useEffect(() => {
    atualizarConsultas();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      atualizarConsultas();
    });

    return unsubscribe;
  }, [navigation, atualizarConsultas]);

  if (consultas && consultas.length === 0) {
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.center}>
            <Text style={styles.texto}>Você ainda não agendou uma consulta</Text>
          </View>
        </View>
      </View>
    );
  }

    const renderItem = ({ item, index }) => {
  const lastItem = index === 0;

  return (
    <View style={styles.textCentro}>
      <Text style={styles.tituloC}>{item.tipo_consulta}</Text>

      <View style={styles.textCentroC}>
        <View style={styles.containerDatePicker}>
          <Text style={styles.texto}>Data da consulta:</Text>
          <Text style={styles.datePickerInput}>{item.data_consulta}</Text>
        </View>

        <View style={styles.containerDatePicker}>
          <Text style={styles.texto}>Horário:</Text>
          <Text style={styles.timePickerInput}>{item.horario_consulta}</Text>
        </View>
      </View>

      {lastItem && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => exibirPopup(item.id_consulta)}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      <View style={styles.line}></View>
    </View>
  );
};

return (
  <View style={styles.background}>
    <View style={styles.topBar}>
      {/* conteúdo do topo */}
    </View>
    <View style={styles.container}>
      <View style={styles.scrollViewWrapper}>
          <FlatList
            data={consultas.reverse()}
            renderItem={renderItem}
            keyExtractor={item => item.id_consulta.toString()}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalConsulta
          handleClose={() => setModalVisible(false)}
          activeModal={activeModal}
          handleOKPress={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  </View>

    );
  };
  

const styles = StyleSheet.create({
  topBar: {
    height: 25,
    backgroundColor: "#FFFFFF",
    width: '100%',

  },
  background: {
    flex: 1,
    backgroundColor: "#1E90FF",
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F3FF",
    //alignItems: 'center', //alinha na horizontal
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    minHeight: Dimensions.get('window').height - 130, // Garante que o contêiner tenha altura mínima

  },
  center:{
    verticalAlign: "middle",
    paddingTop: 300,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: '#000', // cor da linha
    marginVertical: 15, // espaçamento vertical
  },
  titulo: {
    justifyContent: 'center', //alinha na vertical
    alignItems: 'center', //alinha na horizontal
    marginBottom: 30,
    marginTop: 30,
  },
  titulo1: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  tituloC: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 30,

  },

  textCentro: {
    width: "100%",
    fontWeight: 'bold',
    textAlign: "center"

  },
  textCentroC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"

  },
  texto: {
    fontSize: 18, // tamanho do texto
    fontWeight: 'bold',
    height: 40,
    marginBottom: -12,
    textAlign: "center"
  },

  // DateTimePicker
  containerDatePicker: {
    marginBottom: 20,
    borderColor: 'gray',
    borderRadius: 8,

  },
  datePickerInput: {
    backgroundColor: "#FFF",
    fontWeight: 'bold', // texto em negrito
    fontSize: 16, // tamanho do texto dentro do input
    height: 40,
    width: 140, // largura do campo
    textAlign: "center",
    alignItems: "center",
    borderStyle: "solid",
    justifyContent: "center",
    color: 'blue', // A data, depois de selecionada, fica na cor preta.
    borderWidth: 2, // cor da borda
    marginBottom: 5,


  },
  timePickerInput: {
    backgroundColor: "#FFF",
    fontWeight: 'bold', // texto em negrito
    fontSize: 16, // tamanho do texto dentro do input
    height: 40,
    width: 140, // largura do campo
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    color: 'blue', // A data, depois de selecionada, fica na cor preta.
    borderWidth: 2, // cor da borda
    marginBottom: 5,


  },

  // Botão
  button: {
    alignItems: "flex-end",


  },
  buttonText: {
    fontSize: 18, // tamanho do texto dentro do input
    fontWeight: 'bold', // texto em negrito


    color: "red",
    textAlign: "right",
    borderStyle: "solid",



  }


});

export default ConsMarcada;

