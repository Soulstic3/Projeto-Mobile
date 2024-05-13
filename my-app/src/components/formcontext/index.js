import React from 'react';
import { View, ScrollView } from 'react-native';

const FormContext = ({ children }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{children}</View>
    </ScrollView>
  );
};

export default FormContext;