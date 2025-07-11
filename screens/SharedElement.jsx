import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme, commonStyles } from '../theme';
import ScreenWrapper from './ScreenWrapper';
import NavigationButton from '../components/NavigationButton';

const SharedElement = ({ navigation }) => {

    const components = [
        'A1','A2', 'A3', 'A4'
    ];

    return (
        <ScreenWrapper>
            <Text style={styles.title}>Test Animation</Text>
            <View style={styles.buttonRow}>

                    <NavigationButton
                    title="A1"
                    onPress={() => navigation.navigate('A1', { 
                    })}
                    style={styles.button}
                    />

                    <NavigationButton
                    title="A2"
                    onPress={() => navigation.navigate('A2', { 
                    })}
                    style={styles.button}
                    />

                    <NavigationButton
                    title="A3"
                    onPress={() => navigation.navigate('A3', { 
                    })}
                    style={styles.button}
                    />

                    <NavigationButton
                    title="A4"
                    onPress={() => navigation.navigate('A4', { 
                    })}
                    style={styles.button}
                    />

            </View>
        </ScreenWrapper>
    );
};

export default SharedElement;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: theme.primary || '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
