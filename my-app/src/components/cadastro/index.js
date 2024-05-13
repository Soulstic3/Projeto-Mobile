import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export default function Cadastro() {
  const navigation = useNavigation();

  const navigateToCadastro = () => {
    navigation.navigate("Cadastro"); // Navega para a tela de cadastro
  };

  const [nome, setnome] = useState(null)
  const [sus, setsus] = useState(null)
  const [cpf, setcpf] = useState(null)
  const [numero, setnumero] = useState(null)
  const [data, setdata] = useState()
  const [senha, setsenha] = useState(null)
  const [ConfSenha, setConfSenha] = useState(null)
  const [textButton, setTextButton] = useState("Cadastrar")

  return (
    <View style={styles.boxTitle}>
      <Text style={styles.TextTitle}>Página de Cadastro</Text>
      <View style={styles.FormContext}>

      <Text style={styles.label}>Nome Completo:</Text>
          <TextInput
              style={styles.input}
              onChangeText={setnome}
              value={nome}
              placeholder="Ex:Amanda"
          />        
          <Text style={styles.label}>Cartão do SUS:</Text>
          <TextInput
              style={styles.input}
              onChangeText={setsus}
              value={sus}
              placeholder="Ex:000.0000.0000.0000"
              keyboardType="numeric"
          />        
          <Text style={styles.label}>CPF:</Text>
          <TextInput
              style={styles.input}
              onChangeText={setcpf}
              value={cpf}
              placeholder="Ex:000.000.000-00"
          />        
          <Text style={styles.label}>Número para Contato:</Text>
          <TextInput
              style={styles.input}
              onChangeText={setnumero}
              value={numero}
              placeholder="Ex:(00)0 0000-0000"
          />        
          <Text style={styles.label}>Data de Nascimento:</Text>
          <TextInput
              style={styles.input}
              onChangeText={setdata}
              value={data}
              placeholder="Ex:DD/MM/AAAA"
          />
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
        <TouchableOpacity
                    style={styles.buttonClean}
                    onPress={() => limpaCampos()}
                >
                    <Text style={styles.textButtonClean}>{textButton}</Text>
                </TouchableOpacity>

      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  FormContext: {
    padding:10,
    width:"100%",
    height:"85%",
    bottom:0,
    backgroundColor:"#FFFFFF",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginTop:20,
},
input:{
  width:"90%",
  borderRadius:50,
  backgroundColor:"#DCDCDC",
  height:40,
  margin:5,
  paddingLeft:10
},
boxTitle:{
  paddingRight:10,
  paddingLeft:10,
  height:"100%",
  backgroundColor: "#1E90FF",
  fontSize: 22,
  fontWeight: "bold"
},
label:{
  fontSize: 15,
  marginBottom: 3,
  marginLeft: 5,
  color: "#565555",
},
buttonClean:{
  borderRadius:50,
  alignItems:"center",
  justifyContent:"center",
  width:"90%",
  backgroundColor:"#1E90FF",
  paddingTop:10,
  paddingBottom:10,
  marginLeft:12,
  margin:10
},
textButtonClean:{
  fontSize:22,
  color:"#FFFFFF",
},
TextTitle: {
  textAlign:"center",
  paddingTop:30,
  color: "#FFFFFF",
  fontSize: 36,
  fontWeight: "bold"
},
})