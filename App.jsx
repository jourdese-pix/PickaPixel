/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
import WelcomeScreen from './screens/WelcomeScreen';
import ViewScreen from './screens/ViewScreen';
import TextScreen from './screens/TextScreen';        
import QRProfile from './screens/QRProfile';
import Template from './screens/Template';
import QRProfile1 from './screens/QRProfile1';
import QRProfile2 from './screens/QRProfile2';
import SharedElement from './screens/SharedElement';
import A1 from './screens/A1'
import A2 from './screens/A2'
import A3 from './screens/A3'
import A4 from './screens/A4'

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'White',
          },
          headerTintColor: 'White',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: '' }}
        />
        <Stack.Screen name="View" component={ViewScreen} />
        <Stack.Screen name="Text" component={TextScreen} />
        <Stack.Screen name="QRProfile" component={QRProfile} />
        <Stack.Screen name="QRProfile1" component={QRProfile1} />
        <Stack.Screen name="QRProfile2" component={QRProfile2} />
        <Stack.Screen name="QRProfile3" component={QRProfile} />
        <Stack.Screen name="Template" component={Template} />
        <Stack.Screen name="SharedElement" component={SharedElement} />
        <Stack.Screen name="A1" component={A1} />
        <Stack.Screen name="A2" component={A2} />
        <Stack.Screen name="A3" component={A3} />
        <Stack.Screen name="A4" component={A4} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;