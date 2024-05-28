import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import handleImagePicker from "./handleBlob";
import { BASE_URL } from '../../config';
import { useNavigation } from "@react-navigation/native";


export default function Perfil() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState([]);

  const base64Encode = (data) => {
    return btoa(
      String.fromCharCode.apply(
        null,
        data
      )
    );
  };

  const navigateToEndereco = () => {
    navigation.navigate("Endereco");
  };
  const url = `${BASE_URL}/users/perfil`;

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

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation, fetchData]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Erro ao carregar os dados</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <View style={styles.infoContainer}>
      <View style={styles.profileImage}>
        {item.foto_perfil && (
          <Image
            style={styles.image}
            source={{ uri: `data:image/jpeg;base64,${base64Encode(item.foto_perfil.data)}` }}
          />
        )}
        {!item.foto_perfil && (
          <Image
          style={styles.image}
          source={require('../assets/img/profile-pic.jpg')}
          />
        )}
        </View>
          <View style={styles.iconeContainer}>
            <TouchableOpacity style={styles.icone} onPress={handleImagePicker}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Seus dados:</Text>
          </View>
      <Text style={styles.text}>Nome:</Text>
      <Text style={styles.dados}>{item.nome}</Text>
      <Text style={styles.text}>CPF:</Text>
      <Text style={styles.dados}>{item.cpf}</Text>
      <Text style={styles.text}>Data de Nascimento:</Text>
      <Text style={styles.dados}>{item.data_nascimento}</Text>
      <Text style={styles.text}>Número do CADSUS:</Text>
      <Text style={styles.dados}>{item.numero_cadsus}</Text>
      <Text style={styles.text}>Sexo:</Text>
      <Text style={styles.dados}>{item.sexo}</Text>
      <Text style={styles.text}>Telefone:</Text>
      <Text style={styles.dados}>{item.telefone}</Text>
    </View>
  );
  
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <FlatList
          data={dados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View style={styles.titleBar}>
                <Ionicons name="arrow-back" size={24} color="#52575D" />
              </View>
              </View>
          }
          ListFooterComponent={
            <View>
              <TouchableOpacity style={styles.botao} onPress={navigateToEndereco}>
                <Text style={styles.textData}>Endereço</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3970C9"
  },
  iconeContainer: {
    width: 160,
  },
  icone: {
    alignSelf: "flex-end",
  },
  text: {
    fontWeight: "300",
    fontSize: 20,
    marginTop: 20
  },
  textData: {
    fontSize: 15,
    alignSelf: "center",
    color: "#fff"
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
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  titleBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 24,
    height: 60,
    marginBottom: 10

  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
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
    paddingTop: 10,
    borderRadius: 10,
    paddingBottom: 20
  },
  botao: {
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
    width: 300,
    alignSelf: "center",
    backgroundColor: "#3970C9"
  }
});
