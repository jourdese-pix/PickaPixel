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
import SharedElementJ from './screens/SharedElementJ';
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
          animation: 'slide_from_right', 
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
        <Stack.Screen name="SharedElementJ" component={SharedElementJ} />
        <Stack.Screen
          name="A1"
          component={A1}
          options={{
            animation: 'fade', // 👈 A1 will fade in
          }}
        />
        <Stack.Screen
          name="A2"
          component={A2}
          options={{
            animation: 'slide_from_left', // 👈 A2 will slide from left
          }}
        />
        <Stack.Screen
          name="A3"
          component={A3}
          options={{
            animation: 'slide_from_bottom', // 👈 A3 will slide from bottom
          }}
        />
        <Stack.Screen
          name="A4"
          component={A4}
          options={{
            animation: 'slide_from_top', // 👈 A4 will have no animation
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;