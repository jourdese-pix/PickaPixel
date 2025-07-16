/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';


const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();
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
import G1 from './screens/G1'
import G2 from './screens/G2'
import G3 from './screens/G3'
import G4 from './screens/G4'
import G5 from './screens/G5'
import G6 from './screens/G6'
import G7 from './screens/G7'
import G8 from './screens/G8'
import Uplimit from './screens/Uplimit'
import { enableScreens } from 'react-native-screens';
enableScreens();


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
            presentation: 'transparentModal',
            animation: 'slide_from_bottom', // or 'fade', 'default'
            headerShown: false, // optional
          }}
        />
        <Stack.Screen
          name="A2"
          component={A2}
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_left', // or 'fade', 'default'
            headerShown: false, // optional
          }}
        />
        <Stack.Screen
          name="A3"
          component={A3}
          options={{
            presentation: 'transparentModal',
            animation: 'slide_from_right', // or 'fade', 'default'
            headerShown: false, // optional
          }}
        />
        <Stack.Screen
          name="A4"
          component={A4}
          options={{
            presentation: 'transparentModal',
            animation: 'default', // or 'fade', 'default'
            headerShown: false, // optional
          }}
        />
        <Stack.Screen name="G1 - View" component={G1} />
        <Stack.Screen name="G2 - ScrollView" component={G2} />
        <Stack.Screen name="G3 - FlashList" component={G3} />
        <Stack.Screen name="G4 - SectionList" component={G4} />
        <Stack.Screen name="G5 - VirtualizedList" component={G5} />
        <Stack.Screen name="G6 - Backdrop" component={G6} />
        <Stack.Screen name="G7 - Footer" component={G7} />
        <Stack.Screen name="G8 - TextInput" component={G8} />
        <Stack.Screen name="Uplimit" component={Uplimit}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;