import React from 'react';
import { Pressable, Text } from 'react-native';

const NavigationButton = ({ title, onPress, style }) => (
  <Pressable
    style={[
      {
        backgroundColor: '#3700b3',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
      },
      style,
    ]}
    onPress={onPress}
  >
    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{title}</Text>
  </Pressable>
);

export default NavigationButton;
