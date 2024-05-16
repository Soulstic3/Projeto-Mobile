import { Ionicons } from "@expo/vector-icons";
import  AntDesign  from "@expo/vector-icons/AntDesign";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const defaultImage = require('../assets/img/profile-pic.jpg')

export default function Perfil() {
    const [image, setImage] = useState('');

    const handleImagePicker = async () => {
       const result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4,4],
            allowsEditing: true,
            base64: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return(


        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="arrow-back" size={24} color="#52575D"></Ionicons>
                </View>

                <View  style= {styles.formContainer}>
                    <View style={{alignSelf: "center"}}>
                        <View style={styles.profileImage}>
                            <Image source={image ? {uri:image} : defaultImage} 
                                style={styles.image} 
                                resizeMode="center"></Image>                              
                        </View>
                        <TouchableOpacity style={styles.icone}
                            onPress={handleImagePicker}>
                                <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <Text style={styles.nome}></Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Seus dados:</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Nome:</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>CPF:</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>Data de nascimento:</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>Cartão do sus::</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>Sexo:</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>Telefone:</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>Endereço:</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>Bairro:</Text>
                        <Text style={styles.dados}></Text>
                        <Text style={styles.text}>CEP:</Text>
                        <Text style={styles.dados}></Text>
                    </View>
                        <View style={styles.botao}>
                            <Button
                                title="Editar Dados"
                                onPress={() => navigation.navigate('Atualizar')}
                            />
                        </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3970C9"
    },
    icone: {
        alignSelf: "flex-end",
    },
    nome: {
        color: "#52575D",
        fontWeight: "200", 
        fontSize: 36
    },
    text:{
        fontWeight: "300",
        fontSize: 20,
        marginTop: 20
    },
    dados:{
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
        width: 300,
        alignSelf: "center",
    }
});
