import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import handleFormSubmit from './formHandler'
import {cpfApplyMask, susApplyMask, telApplyMask} from "@../../../utils/mask"


export default function Cadastro() {
  const navigation = useNavigation();

  //Pegar dados do formulario e salvar 
  const [nome, setnome] = useState(null)
  const [numero_cadsus, setsus] = useState(null)
  const [cpf, setcpf] = useState(null)
  const [telefone, setnumero] = useState(null)
  const [data_nascimento, setdata] = useState()
  const [senha, setsenha] = useState(null)
  const [ConfSenha, setConfSenha] = useState(null)
  const [textButton, setTextButton] = useState("Cadastrar")

  //dropbar configuração
  const [open, setOpen] = useState(false);
  const [sexo, setSexo] = useState(null);
  const [items, setItems] = useState([
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Não-binário', value: 'Não-binário' }
  ]);

  function applyMaskCPF (input: string) {
    const onlyNumbers = input.replace(/\D/g, "")
    if(onlyNumbers.length === 11){
      const cpf = cpfApplyMask(onlyNumbers)
      return setcpf(cpf)
    }
  }
  function applyMaskSUS (input: string) {
    const onlyNumbers = input.replace(/\D/g, "")
    if(onlyNumbers.length === 15){
      const sus = susApplyMask(onlyNumbers)
      return setsus(sus)
    }
  }
  function applyMaskTel (input: string) {
    const onlyNumbers = input.replace(/\D/g, "")
    if(onlyNumbers.length === 11){
      const tel = telApplyMask(onlyNumbers)
      return setnumero(tel)
    }
  }

  //enviar dados para o formhandler
  const handleSubmit = () => {
    handleFormSubmit({
      nome,
      cpf,
      data_nascimento,
      numero_cadsus,
      sexo,
      telefone,
      senha,
    }, navigation);
  };

  return (
    <View style={styles.boxTitle}>  
      <Text style={styles.TextTitle}>Página de Cadastro</Text>
      <ScrollView>
        <View style={styles.FormContext}>  
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setnome} // quando digitar chamar o setState
            value={nome} // nome do valor
            placeholder="Ex:Amanda" // texto que vai aparecer dentro do input
          />
          <Text style={styles.label}>Cartão do SUS:</Text>
          <TextInput
            style={styles.input}
            onChangeText={applyMaskSUS}
            value={numero_cadsus}
            placeholder="Ex:000.0000.0000.0000"
            keyboardType="numeric"
          />
          <Text style={styles.label}>CPF:</Text>
          <TextInput
            style={styles.input}
            onChangeText={applyMaskCPF}
            value={cpf}
            placeholder="Ex:000.000.000-00"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Número para Contato:</Text>
          <TextInput
            style={styles.input}
            onChangeText={applyMaskTel}
            value={telefone}
            placeholder="Ex:(00)0 0000-0000"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setdata}
            value={data_nascimento}
            placeholder="Ex:DD/MM/AAAA"
          />
          <Text style={styles.label}>Selecione seu Gênero:</Text>
          <View style={styles.dropdownContainer}>
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
          </View>
          <Text style={styles.label}>Crie sua Senha:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setsenha}
            value={senha}
            placeholder="Senha"
            secureTextEntry={true}
          />
          <Text style={styles.label}>Confirme sua Senha:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfSenha}
            value={senha}
            placeholder="Senha"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.buttonClean}onPress={handleSubmit}>
            <Text style={styles.textButtonClean}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
};

//estilização em css
const styles = StyleSheet.create({
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
    borderWidth: 1
  },
  boxTitle: {
    paddingRight: 10,
    paddingLeft: 10,
    height: "100%",
    backgroundColor: "#1E90FF",
    fontSize: 22,
    fontWeight: "bold"
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
    margin: 10
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
    fontWeight: "bold"
  },
  dropdownContainer: {
    maxHeight: 100,
  },
})