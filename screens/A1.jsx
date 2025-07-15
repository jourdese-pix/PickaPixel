import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const A1 = ({ navigation }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>A1 Modal</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.dismiss}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',         // 👈 stick modal to bottom
  },
  modal: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dismiss: {
    marginTop: 20,
    color: '#007aff',
    fontWeight: '600',
  },
});

export default A1;
