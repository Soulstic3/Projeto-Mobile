import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../config';


export default function App() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [dados, setDados] = useState([]);

    const navigateToCadEndereco = () => {
        navigation.navigate("CadEndereco");
    };
    const navigateToAltEndereco = () => {
        navigation.navigate("AltEndereco");
    };

    const url = `${BASE_URL}/endereco/exibir`;


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url); 
            const json = await response.json();
            setDados(json);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
    
      if (dados && dados.length === 0) {
        return (
          <View style={styles.container}>
            <View style={styles.formContainer}>
            <View style={styles.titleBar}>
                      <Ionicons name="arrow-back" size={24} color="#52575D" onPress={navigation.goBack} />
            </View>
              <Text style={styles.text}>Você ainda não cadastrou seu endereço</Text>
              <View style={styles.footer}>
                <TouchableOpacity style={styles.botao} onPress={navigateToCadEndereco}>
                  <Text style={styles.textData}>Cadastrar endereço</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
    const renderItem = ({ item }) => (
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Endereço:</Text>
          <Text style={styles.dados}>{item.endereco}</Text>
          <Text style={styles.text}>Bairro:</Text>
          <Text style={styles.dados}>{item.bairro}</Text>
          <Text style={styles.text}>CEP:</Text>
          <Text style={styles.dados}>{item.cep}</Text>
          <Text style={styles.text}>Complemento:</Text>
          <Text style={styles.dados}>{item.complemento}</Text>
        </View>
      );
      console.log(dados);


    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.formContainer}>
              <FlatList
                data={dados}
                keyExtractor={(item) => item.id ? item.id.toString() : 'unknown'}
                renderItem={renderItem}
                ListHeaderComponent={
                  <View style={styles.headerContainer}>
                    <View style={styles.titleBar}>
                      <Ionicons name="arrow-back" size={24} color="#52575D" onPress={navigation.goBack} />
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.text}>Seu Endereço:</Text>
                    </View>
                  </View>
                }
                ListFooterComponent={ 
                  <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.botao} onPress={navigateToAltEndereco}>
                      <Text style={styles.textData}>Alterar endereço</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3970C9"
    },
    titleBar: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 20
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

    footerContainer: {
      marginTop: 20,
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
        minHeight: 300,
        alignItems: "center",
        position: "relative"
    },
    botao: {
      backgroundColor: "#1E90FF",
      width: 150,
      height: 40,
      borderRadius: 20,
    },
    textData: {
      color: "#fff",
      alignSelf: "center",
      marginTop: 10
    },
    footer: {
      position: "absolute",
      alignSelf: "flex-start",
      margin: 5,
      bottom: 10,
    }
});