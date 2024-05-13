import React from "react";
import { View, Text } from "react-native";

import styles from "./style";

export default function Title(){
    return(
        <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>Sistema de Agendamento de Saude</Text>
            <Text style={styles.textSubTitle}></Text>
        </View>
    )
}