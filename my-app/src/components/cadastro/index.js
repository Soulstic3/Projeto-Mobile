import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native-virtualized-view';
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import handleFormSubmit from "./formHandler";
import { cpfApplyMask, susApplyMask, telApplyMask } from "@../../../utils/mask";

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [numero_cadsus, setNumeroCadsus] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  //as const relacionada ao datepicker
  const [dateButton, setDateButton] = useState(false); //sendo usado no modal
  const [data_nascimento, setDataNascimento] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [inputDate, setInputDate] = useState(""); //sendo usado para selecionar a data em funções
  const [selectedDate, setSelectedDate] = useState(null);

  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [sexo, setSexo] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Masculino", value: "Masculino" },
    { label: "Feminino", value: "Feminino" },
    { label: "Não-binário", value: "Não-binário" },
  ]);

  //função para traduzir a data para o formado br que não está funcionando sabe se la o pq
  const formatDate = (date) => {
    return date.toLocaldateString("pt-BR", {
      day: "2-digits",
      month: "2-digits",
      year: "numeric",
    });
  };

  //função que atualiza a data selecionada no datepicker
  const handleChange = (propDate) => {
    setDataNascimento(propDate);
  };
  //função que salva a data
  const handleSaveDate = () => {
    setSelectedDate(data_nascimento);
    setInputDate(data_nascimento);
    setDateButton(false);
  };
  //Função que mostra a data selecionada no input
  useEffect(() => {
    if (selectedDate) {
      console.log("Selected date:", selectedDate);
    }
  }, [selectedDate]);

  const applyMaskCPF = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length === 11) {
      const cpf = cpfApplyMask(onlyNumbers);
      return setCpf(cpf);
    } else {
      setCpf(value);
    }
  };

  const applyMaskSUS = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length === 15) {
      const sus = susApplyMask(onlyNumbers);
      return setNumeroCadsus(sus);
    } else {
      setNumeroCadsus(value);
    }
  };

  const applyMaskTel = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length === 11) {
      const tel = telApplyMask(onlyNumbers);
      return setTelefone(tel);
    } else {
      setTelefone(value);
    }
  };

  const handleSubmit = () => {
    handleFormSubmit(
      {
        nome,
        cpf,
        data_nascimento,
        numero_cadsus,
        sexo,
        telefone,
        senha,
      },
      navigation
    );
  };

  return (
    <View style={styles.boxTitle}>
      <Text style={styles.TextTitle}>Página de Cadastro</Text>
      <ScrollView>
        <View style={styles.FormContext}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Ex:Amanda"
          />
          <Text style={styles.label}>Cartão do SUS:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => applyMaskSUS(value)}
            value={numero_cadsus}
            placeholder="Ex:000.0000.0000.0000"
            keyboardType="numeric"
          />
          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => applyMaskCPF(value)}
            value={cpf}
            placeholder="Ex:000.000.000-00"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Número para Contato:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => applyMaskTel(value)}
            value={telefone}
            placeholder="Ex:(00)0 0000-0000"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Data de Nascimento:</Text>
          <TouchableOpacity
            onPress={() => {
              console.log("onPress chamado");
              setDateButton(true);
            }}
          >
            <TextInput
              style={styles.input}
              value={inputDate}
              onChangeText={(text) => setInputDate(text)}
              placeholder="YYYY/MM/DD"
              editable={false}
            />
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={dateButton} >
            <View style={styles.centerView}>
              <View style={styles.modalView}>
                <DatePicker
                  style={styles.modal}
                  mode="calendar"
                  selected={data_nascimento}
                  onDateChange={handleChange}
                  minimumDate="1900-01-01"
                  maximumDate="2100-12-31"
                >
                  {({ onChange, value }) => (
                    <TextInput
                      value={formatDate(value)} // Chama a função formatDate para formatar a data
                      onChangeText={onChange}
                      placeholder="Selecione a data"
                      editable={false}
                    />
                  )}
                </DatePicker>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => setDateButton(false)}
                    style={styles.buttonfechar}
                  >
                    <Text style={styles.textData}>Fechar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveDate}
                    style={styles.buttonsave}
                  >
                    <Text style={styles.textData}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Text style={styles.label}>Selecione seu Gênero:</Text>
          {/* <View style={styles.dropdownContainer}> */}
            <DropDownPicker
              style={styles.input}
              open={open}
              value={sexo}
              items={items}
              setOpen={setOpen}
              setValue={setSexo}
              setItems={setItems}
              placeholder="Masculino"
            />
          {/* </View> */}
          <Text style={styles.label}>Crie sua Senha:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setSenha}
            value={senha}
            placeholder="Senha"
            secureTextEntry={true}
          />
          <Text style={styles.label}>Confirme sua Senha:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfSenha}
            value={confSenha}
            placeholder="Senha"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.buttonClean} onPress={handleSubmit}>
            <Text style={styles.textButtonClean}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 300,
    width: 300,
  },
  FormContext: {
    padding: 10,
    width: "100%",
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginTop: 20,
  },
  input: {
    width: "90%",
    borderRadius: 50,
    backgroundColor: "#DCDCDC",
    height: 47,
    margin: 5,
    paddingLeft: 10,
    borderStyle: "solid",
    borderWidth: 1,
  },
  boxTitle: {
    paddingRight: 10,
    paddingLeft: 10,
    height: "100%",
    backgroundColor: "#1E90FF",
    fontSize: 22,
    fontWeight: "bold",
  },
  label: {
    fontSize: 15,
    marginBottom: 3,
    marginLeft: 5,
    color: "#565555",
  },
  buttonClean: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#1E90FF",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 12,
    margin: 10,
  },
  textButtonClean: {
    fontSize: 22,
    color: "#FFFFFF",
  },
  TextTitle: {
    textAlign: "center",
    paddingTop: 30,
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },
  dropdownContainer: {
    maxHeight: 100,
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "90%",
    height: 450,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  buttonfechar: {
    backgroundColor: "#1E90FF",
    flex: 1,
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  buttonsave: {
    backgroundColor: "#1E90FF",
    flex: 1,
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  textData: {
    color: "#FFFFFF",
    fontSize: 15,
  },
});
