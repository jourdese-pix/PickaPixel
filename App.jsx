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

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;