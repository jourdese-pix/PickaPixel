import { StyleSheet, Text, View, ScrollView, Pressable, Animated } from 'react-native'
import React, { useState } from 'react'
import QRProfile from './QRProfile';
import { Screen } from 'react-native-screens';
import ScreenWrapper from './ScreenWrapper';
import NavigationButton from '../components/NavigationButton';

const ComponentButton = ({ 
    title, 
    onPress, 
    expanded,
    buttonStyle,
    textStyle,
    animationDuration = 300,
    activeColor = '#3700b3',
    inactiveColor = '#6200ee',
    children,
    onLongPress,
    onPressOut
}) => {
    const [animation] = useState(new Animated.Value(0));

    React.useEffect(() => {
        const anim = Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: animationDuration,
            useNativeDriver: false,
        });
        
        anim.start();
        
        return () => {
            anim.stop();
        };
    }, [expanded, animationDuration, animation]);

    const backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [inactiveColor, activeColor]
    });

    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.02]
    });

    return (
        <Pressable onPress={onPress} onLongPress={onLongPress} onPressOut={onPressOut}>
            <Animated.View 
                style={[
                    styles.button, 
                    { backgroundColor, transform: [{ scale }] },
                    buttonStyle
                ]}
            >
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                {children}
            </Animated.View>
        </Pressable>
    );
};

const WelcomeScreen = ({ navigation }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [longPressedIndex, setLongPressedIndex] = useState(null);

    const components = [
        'QRCode','SharedElementJ', 'Template'
    ];

    return (
        <ScreenWrapper>
        <ScrollView style={styles.container}>
            <Text style={styles.header}>PixelMine Components</Text>
            <Text style={styles.subheader}>
                Explore the components available in PixelMine. Tap to navigate and learn more.
            </Text>
{components.map((component, index) => (
    <View key={component}>
        <ComponentButton
            title={component}
            expanded={expandedIndex === index}
            onPress={() => {
                setExpandedIndex(expandedIndex === index ? null : index);
            }}
            onLongPress={() => setLongPressedIndex(index)}
            onPressOut={() => setLongPressedIndex(null)}
            animationDuration={400}
            activeColor={index % 2 === 0 ? '#3700b3' : '#3700b3'}
            inactiveColor={index % 2 === 0 ? '#16733e' : '#16733e'}
            buttonStyle={{
                marginHorizontal: 8,
                borderRadius: expandedIndex === index ? 16 : 12,
            }}
            textStyle={{
                fontSize: expandedIndex === index ? 18 : 16,
            }}
        >
            {longPressedIndex === index && (
                <Text style={styles.buttonSubtext}>Tap to learn more</Text>
            )}
        </ComponentButton>
{expandedIndex === index && (
    <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 8, marginBottom: 12 }}>
        {/* Custom content for each component */}
        {component === 'View' && (
            <>
                <Text style={{ color: '#333', fontSize: 15, marginBottom: 8 }}>
                    This is the View component. Tap below to see details.
                </Text>
                <Pressable
                    style={{
                        backgroundColor: '#3700b3',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginBottom: 8,
                    }}
                    onPress={() => navigation.navigate('View')}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go to ViewScreen</Text>
                </Pressable>
                <Pressable
                    style={{
                        backgroundColor: '#2196F3',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('Text')}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go to TextScreen</Text>
                </Pressable>

            </>
        )}
        {component === 'Text' && (
            <>
                <Text style={{ color: '#333', fontSize: 15, marginBottom: 8 }}>
                    This is the Text component. Tap below to see details.
                </Text>
                <Pressable
                    style={{
                        backgroundColor: '#2196F3',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('Text')}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go to TextScreen</Text>
                </Pressable>
            </>
        )}
        {component === 'QRCode' && (
            <>
                <Text style={{ color: '#333', fontSize: 15, marginBottom: 8 }}>
                    This is the QRCode - Business Card component.
                </Text>
                <View style={{ gap: 5 }}>
                {/* <Pressable
                    style={{
                        backgroundColor: '#3700b3',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                    onPress={() =>
                        navigation.navigate('QRProfile', {
                        qrCodeUri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://yourwebsite.com',
                        name: 'Jourdese Palacio',
                        title: 'Mobile Developer',
                        phone: '+63 912 345 6789',
                        email: 'jourdesepalacio@pixelmine.org',
                        website: 'https://pixelmine.org',
                        })
                    }
                >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Design 1 - Business Card</Text>  
                </Pressable> */}
                <NavigationButton
                title="Design 1 - Business Card"
                onPress={() => navigation.navigate('QRProfile', { 
                    qrCodeUri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://yourwebsite.com',
                        name: 'Jourdese Palacio',
                        title: 'Mobile Developer',
                        phone: '+63 912 345 6789',
                        email: 'jourdesepalacio@pixelmine.org',
                        website: 'https://pixelmine.org',
                 })}
                style={{ backgroundColor: '#3700b3' }}
                />
                <NavigationButton
                title="Design 2 - Business Card"
                onPress={() => navigation.navigate('QRProfile1', { 
                    qrCodeUri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://yourwebsite.com',
                        name: 'Jourdese Palacio',
                        title: 'Mobile Developer',
                        phone: '+63 912 345 6789',
                        email: 'jourdesepalacio@pixelmine.org',
                        website: 'https://pixelmine.org',
                 })}
                style={{ backgroundColor: '#3700b3' }}
                />
                <NavigationButton
                title="Design 3 - Business Card"
                onPress={() => navigation.navigate('QRProfile2', { 
                    qrCodeUri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://yourwebsite.com',
                        name: 'Jourdese Palacio',
                        title: 'React Native Developer',
                        cardtitle: 'Business Card',
                        phone: '+63 912 345 6789',
                        email: 'jourdesepalacio@pixelmine.org',
                        website: 'https://pixelmine.org',
                 })}
                style={{ backgroundColor: '#3700b3' }}
                />
                </View>
            </>
        )}
                {component === 'SharedElementJ' && (
            <>
                <Text style={{ color: '#333', fontSize: 15, marginBottom: 8 }}>
                    Shared Element
                </Text>
                <NavigationButton
                title="Go to Shared Template"
                onPress={() => navigation.navigate('SharedElementJ', { 
                 })}
                style={{ backgroundColor: '#3700b3' }}
                />
            </>
        )}
                {component === 'Template' && (
            <>
                <Text style={{ color: '#333', fontSize: 15, marginBottom: 8 }}>
                    Template
                </Text>
                {/* <Pressable
                    style={{
                        backgroundColor: '#3700b3',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('Template')}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go to Template</Text>
                </Pressable> */}
                <NavigationButton
                title="Go to Template"
                onPress={() => navigation.navigate('Template', { 
                 })}
                style={{ backgroundColor: '#3700b3' }}
                />
            </>
        )}
    </View>
)}
    </View>
))}

        </ScrollView>
        </ScreenWrapper>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
        textAlign: 'center',
        marginTop: 16,
    },
    subheader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
    },
    button: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonSubtext: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 4,
    },
})

