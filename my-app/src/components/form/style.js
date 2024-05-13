import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formContext: {
        width:"100%",
        height:"100%",
        bottom:0,
        backgroundColor:"#FFFFFF",
        alignItems: "center",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginTop:30,
    },
    form:{
        width:"100%",
        height:"auto",
        marginTop:20,
        padding:10
    },
    input:{
        width:"90%",
        borderRadius:50,
        backgroundColor:"#DCDCDC",
        height:40,
        margin:5,
        paddingLeft:10
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
    label:{
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 5,
        color: "#7A7878",
    }
});

export default styles;