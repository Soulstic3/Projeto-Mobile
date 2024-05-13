import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
export function ModalConsulta({ handleClose }){
    const navigation = useNavigation();

    const handleOKPress = () => {
        // Aqui você pode redirecionar para a página desejada
        navigation.navigate("cons_marcada");
    };
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Sua consulta foi marcada!
                Clique em "OK" para visualizar suas consultas marcadas.
                </Text>
                
                <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.button} onPress={ handleClose }>
                    <Text>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleOKPress}>
                    <Text>OK</Text>
                </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            backgroundColor: "rgba(24, 24, 24, 0.6)",
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        content: {
            backgroundColor: "#FFF",
            width: "85%", //largura
            paddingTop: 20,
            paddingBottom: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8 //cincunferencia da borda
        },
        title: {
            fontSize: 25, // tamanho da fonte
            fontWeight: "bold", //negrito
            color: "#000",
            marginBottom: 50,
            textAlign: "left",
            left: "auto",
            width: "90%"
        },
        buttonArea: {
            flexDirection: "row", //botoes um ao lado do outro
            width: '80%', //largura
            alignItems: "center",
            justifyContent: "space-between"
        },
        button:{
            flex:1,
            alignItems: "center",
            padding: 10, //espaçamento entre eles
            borderRadius: 8,
            fontWeight: 'bold',
            backgroundColor: "#4444"
        }

});

export default ModalConsulta;