import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function App({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="arrow-back" size={24} color="#52575D"></Ionicons>
                </View>

                <View  style= {styles.formContainer}>
                    <View style={{alignSelf: "center"}}>
                        <View style={styles.profileImage}>
                            <Image source={require("../assets/img/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                        </View>
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <Text style={styles.nome}>Felipe Miguel</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Seus dados:</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Nome:</Text>
                        <Text style={styles.dados}>Felipe Miguel S</Text>
                        <Text style={styles.text}>CPF:</Text>
                        <Text style={styles.dados}>***.***.***-**</Text>
                        <Text style={styles.text}>Data de nascimento:</Text>
                        <Text style={styles.dados}>dd/mm/aa</Text>
                        <Text style={styles.text}>Cartão do sus::</Text>
                        <Text style={styles.dados}>*** **** **** ****</Text>
                        <Text style={styles.text}>Sexo:</Text>
                        <Text style={styles.dados}>Masculino</Text>
                        <Text style={styles.text}>Telefone:</Text>
                        <Text style={styles.dados}>(81 9 99910811)</Text>
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
