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
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = () => {
    setRefreshing(true)
    fetchData()
    setRefreshing(false)
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
        <View style={styles.formContainer}>
          <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
        </View>
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
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  botao: {
    backgroundColor: "#3970C9",
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
    width: 300,
    alignSelf: "center"
  },
  container: {
    backgroundColor: "#3970C9",
    flex: 1
  },
  dados: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    fontSize: 20,
    fontWeight: "300",
    marginTop: 10,
    textAlign: "center",
    width: 300
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    paddingBottom: 20,
    paddingTop: 10,
    minHeight: 600
  },
  icone: {
    alignSelf: "flex-end"
  },
  iconeContainer: {
    width: 160
  },
  infoContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  loading: {
    paddingTop: 300,
  },
  profileImage: {
    borderRadius: 100,
    borderStyle: "solid",
    borderWidth: 1,
    height: 200,
    overflow: "hidden",
    width: 200
  },
  text: {
    fontSize: 20,
    fontWeight: "300",
    marginTop: 20
  },
  textData: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 15
  },
  titleBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    paddingTop: 24
  }
});
