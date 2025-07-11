import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const CustomView = ({ 
    width = '100%',
    height = 100,
    backgroundColor = '#6200ee',
    borderRadius = 8,
    padding = 16,
    elevation = 2,
    children,
    style
}) => {
    return (
        <View
            style={[{
                width,
                height,
                backgroundColor,
                borderRadius,
                padding,
                elevation,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: elevation,
                },
                shadowOpacity: 0.25,
                shadowRadius: elevation,
            }, style]}
        >
            {children}
        </View>
    )
}

const ViewScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>View Component</Text>
            
            {/* Best Practices Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Best Practices</Text>
                <CustomView 
                    height={180}
                    backgroundColor="#fff"
                    style={styles.card}
                >
                    <Text style={styles.bulletPoint}>• Use flex layout for responsive designs</Text>
                    <Text style={styles.bulletPoint}>• Avoid fixed dimensions when possible</Text>
                    <Text style={styles.bulletPoint}>• Consider safe area insets</Text>
                    <Text style={styles.bulletPoint}>• Implement proper nesting</Text>
                    <Text style={styles.bulletPoint}>• Optimize rendering performance</Text>
                </CustomView>
            </View>

            {/* Props Demo Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CustomView Props Demo</Text>
                
                {/* Basic Usage */}
                <CustomView backgroundColor="#6200ee">
                    <Text style={styles.lightText}>Basic CustomView</Text>
                </CustomView>

                {/* Custom Size */}
                <View style={styles.row}>
                    <CustomView
                        width="45%"
                        height={80}
                        backgroundColor="#2196F3"
                        style={styles.marginRight}
                    >
                        <Text style={styles.lightText}>Width: 45%</Text>
                    </CustomView>
                    <CustomView
                        width="45%"
                        height={80}
                        backgroundColor="#2196F3"
                    >
                        <Text style={styles.lightText}>Width: 45%</Text>
                    </CustomView>
                </View>

                {/* Elevation Demo */}
                <View style={styles.row}>
                    <CustomView
                        width="30%"
                        backgroundColor="#4CAF50"
                        elevation={1}
                        style={styles.marginRight}
                    >
                        <Text style={styles.lightText}>Elevation 1</Text>
                    </CustomView>
                    <CustomView
                        width="30%"
                        backgroundColor="#4CAF50"
                        elevation={4}
                        style={styles.marginRight}
                    >
                        <Text style={styles.lightText}>Elevation 4</Text>
                    </CustomView>
                    <CustomView
                        width="30%"
                        backgroundColor="#4CAF50"
                        elevation={8}
                    >
                        <Text style={styles.lightText}>Elevation 8</Text>
                    </CustomView>
                </View>
            </View>

            {/* Implementation Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Implementation</Text>
                <CustomView 
                    backgroundColor="#fff"
                    height="auto"
                    style={styles.card}
                >
                    <Text style={styles.code}>
{`const CustomView = ({ 
    width = '100%',
    height = 100,
    backgroundColor = '#6200ee',
    borderRadius = 8,
    padding = 16,
    elevation = 2,
    children,
    style
}) => {
    return (
        <View
            style={[{
                width,
                height,
                backgroundColor,
                borderRadius,
                padding,
                elevation,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: elevation,
                },
                shadowOpacity: 0.25,
                shadowRadius: elevation,
            }, style]}
        >
            {children}
        </View>
    )
}`}
                    </Text>
                </CustomView>
            </View>
        </ScrollView>
    )
}

export default ViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 16,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
    },
    bulletPoint: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        marginTop: 12,
    },
    marginRight: {
        marginRight: 12,
    },
    lightText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 14,
        color: '#333',
    },
})
