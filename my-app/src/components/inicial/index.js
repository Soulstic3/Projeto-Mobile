import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { ModalConsulta } from '../modal/index';  
import DropDownPicker from 'react-native-dropdown-picker'; //menu drop
import DateTimePicker from '@react-native-community/datetimepicker'; // campo data
//import DatePicker from "react-native-modern-datepicker";
import { useNavigation } from '@react-navigation/native';

export function Inicial() {
  const [modalVisible, setModalVisible] = useState(false); // pop up botao marcar
  const [activeModal, setActiveModal] = useState('none'); // Estado para controlar qual modal está aberto
  //
  const [open, setOpen] = useState(false); // dropdown menu selecionado
  const [tipo, setTipo] = useState(null);
  //
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data selecionada no DateTimePicker
  const [selectedTime, setSelectedTime] = useState(new Date()); // Horário selecionado no DateTimePicker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dateInputValue, setDateInputValue] = useState(''); // texto do placeholder destacado de preto
  const [timeInputValue, setTimeInputValue] = useState(''); // texto do placeholder destacado de preto
  //const [date, setDate] = useState(new Date());
  //const [time, setTime] = useState(new Date());

  const navigation = useNavigation();
  

  const handleDateChange = (event, date) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    const newDate = date || selectedDate;
    setSelectedDate(newDate);
    setShowDatePicker(false);
    setDateInputValue(formatDate(newDate)); // Atualiza o valor do campo de data após a seleção
    };

    const formatDate = (date) => {
      // Formata a data no formato "dia/mês/ano"
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };
  
    const handleTimeChange = (event, time) => {
      if (event.type === 'dismissed') {
        setShowTimePicker(false);
        return;
      }
      const newTime = time || selectedTime;
      setSelectedTime(newTime);
      setShowTimePicker(false);
      setTimeInputValue(formatTime(newTime));
    };

    const formatTime = (time) => {
      // Formata o horário no formato "HH:MM"
      return time.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
 
  const handlePress = () => {
    setActiveModal('consulta'); // Define o modal de consulta como ativo
    setModalVisible(true);
    navigation.navigate('ConsMarcada', { 
      selectedDate: selectedDate.toISOString(), 
      selectedTime: selectedTime.toISOString(), 
      open: tipo // Passa o valor selecionado do tipo
    });
  };


const [items, setItems] = useState([
  { label: '  Dentista', value: 'Dentista' },
  { label: '  Médico', value: 'Médico' },
  { label: '  Nutricionista', value: 'Nutricionista' },
  { label: '  Psicólogo', value: 'Psicólogo' },
  { label: '  Pediatra', value: 'Pediatra' },
]);



  return (
<View style={styles.background}>
  <View style={styles.topBar}> 
  </View>

  <View style={styles.container}>
    <View style={styles.titulo}>
      <Text style={styles.tituloG}>Marque sua consulta</Text>
    </View>
  
    <View style={[styles.textCentro, styles.zIndexHigh]}>
      <Text style={styles.texto}>Tipo da consulta:</Text> 
        <View style={styles.dropCenter}>
          <DropDownPicker
            style={styles.inputDrop}
            open={open}
            value={tipo}
            items={items}
            setOpen={setOpen}
            setValue={setTipo}
            setItems={setItems}
            placeholder=""
            textStyle={styles.dropdownText} // Adicionando estilo para o texto dos itens do dropdown
            labelStyle={styles.dropdownLabel} // Adicionando estilo para os rótulos dos itens do dropdown

            listItemContainerStyle={styles.listItemContainer} // Adicionando estilo para o container dos itens do dropdown
            selectedItemLabelStyle={styles.selectedItemLabel} // Adicionando estilo para o texto dos itens selecionados
            itemSeparator={true} // Adiciona linhas divisórias entre os itens
            itemSeparatorStyle={styles.itemSeparator} // Estilo das linhas divisórias
            zIndex={5000} // Adicionando zIndex ao DropDownPicker
            containerStyle={{ zIndex: 5000 }} // Adicionando zIndex ao contêiner
          />
        </View>

        {/* Campo input data */}

      <Text style={styles.texto}>Data da consulta:</Text>
      <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}  >  
        <View style={styles.containerDatePicker}>
          <TextInput 
            style={styles.datePickerInput}
            value={dateInputValue} // Mostra a data selecionada no campo de texto/placeholder // alterado
            editable={false} // Impede que o usuário edite manualmente o campo
            placeholder="dia/mês/ano"
            placeholderTextColor="black" // Alterado
            //onChangeText={text => setDateInputValue(text)} // . . .
          />
        </View>
      </TouchableWithoutFeedback>

          <Text style={styles.texto}>Horário:</Text>
          <TouchableWithoutFeedback onPress={() => setShowTimePicker(true)}  >  
            <View style={styles.containerDatePicker}>
              <TextInput  // adicionando estilizacao
                
                style={styles.timePickerInput}
                value={timeInputValue} // Mostra o horario selecionado no campo de texto/placeholder // alterado
                editable={false} // Impede que o usuário edite manualmente o campo
                placeholder="--Escolha--"
                placeholderTextColor="black" // Alterado
              />
            </View>
          </TouchableWithoutFeedback>
    </View>

      {/* Botao marcar consulta e seu modal */}
    <TouchableOpacity 
      style={styles.button} 
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Marcar</Text>
    </TouchableOpacity>

    <Modal 
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <ModalConsulta 
      handleClose={ () => setModalVisible(false) }
      activeModal={activeModal}

      />
    </Modal>

        {/* Definindo os valores do DateTimePicker */}
        {showDatePicker && (
            <DateTimePicker 
              value={selectedDate}
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
              value={selectedTime}
              onChange={handleTimeChange}
              mode="time"
              is24Hour={true}
              display="spinner"
              textColor="#000" // Define a cor do texto
              style={{ backgroundColor: "#FFF" }} // Define o estilo do componente
            />
            
          )}
         
  </View>
</View>
  );
};
const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#FFFFFF",
    height: 90,
    width: '100%',
  },
  background: {
    flex: 1,
    backgroundColor: "#1E90FF",
  },
  container:{
    backgroundColor: "#F3F3FF",
    flex: 1,
    padding: 30,
    
    justifyContent: 'center', //alinha na vertical
    alignItems: 'center', //alinha na horizontal
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  titulo: {
    justifyContent: 'center', //alinha na vertical
    alignItems: 'center', //alinha na horizontal
  },
  tituloG:{
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 0,

  },
  textCentro: {
    alignItems: 'flex-start', //alinha na horizontal
    marginTop: 40,
    marginBottom: 110,
    width: "100%",
    fontWeight: 'bold',
  },
  texto:{
    fontSize: 22, // tamanho do texto
    fontWeight: 'bold',
    height: 50,
    marginTop: 10,
    marginBottom: -12,

    // Dropdown 
  },
  dropCenter:{
    width: "65%",
    
  },
  zIndexHigh: {
    zIndex: 5000, // Alta prioridade para o DropDownPicker
    elevation: 10, // Adicionando elevação para Android
  },
  inputDrop:{
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 2, // cor da borda
    minHeight: 10,

  },

  dropdownText:{ // dentro do menu
    letterSpacing: 2, // espaçamento de texto
    fontSize: 18, // Define o tamanho da fonte
    fontWeight: 'bold', // Define o texto como negrito
    textAlign: "justify",
    justifyContent: 'center', // alinhe verticalmente    
    paddingTop: 1, // espaçamento do topo dentro
    height: 30 // defina a altura desejada

  },
  dropdownLabel: {
    fontWeight: 'bold', // Define o texto como negrito
    textAlign: "center",
    color: 'blue',
    fontSize: 18, // Define o tamanho da fonte

  },
  listItemContainer: {
    backgroundColor: '#FFFFF0', // Cor de fundo dos itens do dropdown // Marfim: #FFFFF0
    padding: 1 // Padding dos itens do dropdown
  },
  selectedItemLabel: {
    color: 'blue', // Cor do texto dos itens selecionados
    fontWeight: 'bold' // Texto em negrito para os itens selecionados
  },
  itemSeparator: {
    height: 1, // Altura da linha divisória
    backgroundColor: 'gray' // Cor da linha divisória
  },
  
  // DateTimePicker
  containerDatePicker:{
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 2, // cor da borda
    borderRadius: 8, 
  },
  datePickerInput:{
    backgroundColor: "#FFF",
    fontWeight: '300', // texto em negrito
    fontSize: 20, // tamanho do texto dentro do input
    height: 40,
    width: 120, // largura do campo
    textAlign: "center",
    alignItems: "center",
    borderStyle: "solid",
    justifyContent: "center",
    borderRadius: 8, // borda arredondada
    color: 'blue' // A data, depois de selecionada, fica na cor preta.
  },

  timePickerInput:{
    backgroundColor: "#FFF",
    fontWeight: '300', // texto em negrito
    fontSize: 22, // tamanho do texto dentro do input
    height: 40,
    width: 120, // largura do campo
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderRadius: 8, // borda arredondada
    color: 'blue' // A data, depois de selecionada, fica na cor preta.
  },

  // Botão
  buttonText: {
    color: "#FFF",
    fontSize: 28, // tamanho do texto
    letterSpacing: 1,
    textAlign: "center",
    justifyContent: "center",
    padding: 2,
  },
  button: {
    backgroundColor: "#1E90FF",
    width: "50%",
    height: 50,
    borderWidth: 2, // cor da borda
    borderStyle: "solid",
    borderRadius: 8, // borda arredondada
    marginBottom: 0,
    //marginTop: 30,

    
    elevation: 10,
  },
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