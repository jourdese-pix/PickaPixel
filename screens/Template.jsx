import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { theme, commonStyles } from '../theme'
import { Screen } from 'react-native-screens';
import ScreenWrapper from './ScreenWrapper';


const Template = () => {
    const [sHello, setHello] = useState(false);
    const cHello = "Hello";

    return (
    <ScreenWrapper>
        <Text>Hello</Text>    
    </ScreenWrapper>
    
    )
}

export default Template

const styles = StyleSheet.create({
 
})
