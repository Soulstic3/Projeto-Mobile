import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // campo data
import { ModalConsulta } from '../modal/index';  
import { useRoute } from '@react-navigation/native';

const formatDate = (date) => {
  // Formata a data no formato "dia/mês/ano"
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (time) => {
  // Formata o horário no formato "HH:MM"
  return new Date(time).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function ConsMarcada() {
  // Rota ao clicar no botao marcar consulta dos campos selecionados
  const route = useRoute();
  const { selectedDate, selectedTime, open } = route.params;

  if (!selectedDate || !selectedTime || !open) {
    return (
      <View>
        <Text>Erro: Parâmetros inválidos.</Text>
      </View>
    );
  }
  //
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState('none'); // Estado para controlar qual modal está aberto
// Estado para armazenar a data selecionada
  const exibirPopup = () => {
    setModalVisible(true);
    setActiveModal('cancelar'); // Define o modal de consulta como ativo
  };

  const [date, setDate] = useState(new Date(selectedDate));
  const [time, setTime] = useState(new Date(selectedTime));

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [dateInputValue, setDateInputValue] = useState(formatDate(selectedDate)); // texto do placeholder destacado de preto
  const [timeInputValue, setTimeInputValue] = useState(formatTime(selectedTime)); // texto do placeholder destacado de preto

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setDateInputValue(formatDate(currentDate)); // // Atualiza o valor do campo de data após a seleção
  };
    

    const handleTimeChange = (event, selectedTime) => { // Manipulador para o horário
      const currentTime = selectedTime || time;
      setShowTimePicker(false);
      setTime(currentTime);
      setTimeInputValue(formatTime(currentTime)); // // Atualiza o valor do campo de horário após a seleção
    };
    
  
  return (

          <View style={styles.background}>
        <View style={styles.topBar}> 
        </View>
    <View style={styles.scrollViewWrapper}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.container}>
          <View style={styles.titulo}>
            <Text style={styles.titulo1}>Suas consultas marcadas:</Text>
          </View>

          <View style={styles.line}></View>
        
          <View style={styles.textCentro}>

              {/* campo do texto alterado */}
              <TextInput 
              style={styles.tituloC}
              editable={false}
              placeholderTextColor="black"
              placeholder='Tipo da consulta'
              value={open}
              >
              </TextInput> 

                    {/* Campo data e hora */}
                <View style={styles.textCentroC}>
                  <View style={styles.containerDatePicker}>
                    <Text style={styles.texto}>Data da consulta:</Text>
                      <TextInput  
                        style={styles.datePickerInput}
                        value={dateInputValue} // Mostra a data selecionada no campo de texto/placeholder // alterado
                        editable={false} // Impede que o usuário edite manualmente o campo
                        placeholderTextColor="black" // Alterado
                      />
                  </View>

                    <View style={styles.containerDatePicker}>
                        <Text style={styles.texto}>Horário:</Text>
                          <TextInput 
                            style={styles.timePickerInput}
                            value={timeInputValue} // Mostra o horario selecionado no campo de texto/placeholder // alterado
                            editable={false} // Impede que o usuário edite manualmente o campo
                            placeholderTextColor="black" // Alterado
                          />
                    </View>
                </View>
                  {/* botao cancelar consulta */}
                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={exibirPopup}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>

                <View style={styles.line}></View>

          </View>

              {/* Definindo os valores do DateTimePicker */}
              {showDatePicker && (
                  <DateTimePicker 
                    value={date}
                    onChange={handleDateChange}
                    mode="date"
                    is24Hour={true}
                    display="spinner"
                    textColor="#000" // Define a cor do texto
                    style={{ backgroundColor: "#FFF" }} // Define o estilo do componente
                  />
                )}

              {showTimePicker && (
                  <DateTimePicker 
                    value={time}
                    onChange={handleTimeChange}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    textColor="#000" // Define a cor do texto
                    style={{ backgroundColor: "#FFF" }} // Define o estilo do componente
                  />
                )}

                <Modal 
                      animationType="fade"
                      transparent={true} // fundo transparente
                      visible={modalVisible} // controla a visibilidade
                      onRequestClose={() => setModalVisible(false)} //fecha o modal
                    >
                    <ModalConsulta 
                      handleClose={ () => setModalVisible(false) } // funcao como prop que fecha o modal
                      activeModal={activeModal}  // qual modal deve ser exibido/controle
                      handleOKPress={() => setModalVisible(false)} // fecha o modal quando um botao é selecionado
                      //handleDateSelect={handleDateSelect}
                    />
                </Modal>
        </View>
      </ScrollView>
      </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 90,
    backgroundColor: "#FFFFFF",
    width: '100%',
    
  },
  background: {
    flex: 1,
    backgroundColor: "#1E90FF",
  },
  scrollViewWrapper: {
    flex: 1, // Garante que o ScrollView ocupe todo o espaço disponível
  },
  scrollViewContent: {
    flexGrow: 1, // Garante que o conteúdo do ScrollView cresça para preencher o espaço disponível
    justifyContent: 'center', // Centraliza verticalmente se o conteúdo for menor que a tela
    //paddingVertical: 10,
  },
  container:{
    flex:1,
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
  textCentroC:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"

  },
  texto:{
    fontSize: 18, // tamanho do texto
    fontWeight: 'bold',
    height: 40,
    marginBottom: -12,

  },

  // DateTimePicker
  containerDatePicker:{
    marginBottom: 20,
    borderColor: 'gray',
    borderRadius: 8, 
    
  },
  datePickerInput:{
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
  timePickerInput:{
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
    button:{
      alignItems: "flex-end",


    },
    buttonText:{
      fontSize: 18, // tamanho do texto dentro do input
      fontWeight: 'bold', // texto em negrito


      color: "red",
      textAlign: "right",
      borderStyle: "solid",



    }

  
});

export default ConsMarcada;

