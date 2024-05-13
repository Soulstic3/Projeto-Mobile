import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';




export default function App(){
    const {control, handleSubmit, formState: {errors} } = useForm({})

    function handleSignIn(data){
        console.log(data);
    }

    return(
        <View style={styles.container}>
            <View style={styles.formContainer}>
                
                        <Controller
                            control={control}
                            name="nomeSocial"
                            render={({ field: { onChange, value} }) => (
                                <TextInput
                                style={styles.dados}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Nome Social"
                                    />
                            )}
                        />
                
                        <Controller
                            control={control}
                            name="CPF"
                            render={({ field: { onChange, value} }) => (
                                <TextInput
                                style={styles.dados}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="CPF"
                                    />
                            )}
                        />
                
                        <TouchableOpacity style={styles.botao} onPress={handleSubmit(handleSignIn)}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3970C9"
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
        paddingBottom: 20,
        alignItems: "center"
    },
    botao: {
        marginTop: 30,
        width: 300,
        alignSelf: "center",
    }
});