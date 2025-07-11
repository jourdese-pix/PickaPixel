import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { theme, commonStyles } from '../theme'

const CustomText = (props) => {
    const { text, style, ...otherProps } = props
    return (
        <Text style={[styles.customText, style]} {...otherProps}>
            {text}
        </Text>
    )
}

const TextScreen = () => {
    const [expanded, setExpanded] = useState(false);
    const longText = "This is a long text that demonstrates text truncation. Click to expand and see the full content of this text. It shows how numberOfLines prop works in React Native.";

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Text Component</Text>

            {/* Best Practices Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Best Practices</Text>
                <View style={styles.card}>
                    <Text style={styles.bulletPoint}>• Use consistent text styles</Text>
                    <Text style={styles.bulletPoint}>• Handle text overflow properly</Text>
                    <Text style={styles.bulletPoint}>• Consider accessibility settings</Text>
                    <Text style={styles.bulletPoint}>• Implement proper text scaling</Text>
                    <Text style={styles.bulletPoint}>• Use appropriate font weights</Text>
                </View>
            </View>

            {/* Props Demo Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>CustomText Props Demo</Text>
                <View style={styles.card}>
                    {/* Size Demo */}
                    {/* In this example, otherProps will contain:
                        {
                            size: 24,
                            weight: "bold",
                            color: "#6200ee"
                        }
                        These props will be spread onto the Text component */}
                    <CustomText
                        text="Large Bold Text"
                        size={24}
                        weight="bold"
                        color="#6200ee"
                        style={styles.marginBottom}
                    />

                    {/* Color and Weight Demo */}
                    <View style={styles.row}>
                        <CustomText
                            text="Light"
                            weight="300"
                            color="#2196F3"
                        />
                        <CustomText
                            text="Regular"
                            weight="normal"
                            color="#4CAF50"
                            style={styles.marginHorizontal}
                        />
                        <CustomText
                            text="Bold"
                            weight="bold"
                            color="#FF5722"
                        />
                    </View>

                    {/* Alignment Demo */}
                    <View style={styles.marginVertical}>
                        <CustomText
                            text="Left Aligned"
                            align="left"
                            style={styles.marginBottom}
                        />
                        <CustomText
                            text="Center Aligned"
                            align="center"
                            style={styles.marginBottom}
                        />
                        <CustomText
                            text="Right Aligned"
                            align="right"
                        />
                    </View>

                    {/* Truncation Demo */}
                    {/* In this example, otherProps will contain:
                        {
                            numberOfLines: expanded ? undefined : 2,
                            onPress: () => setExpanded(!expanded)
                        }
                        - numberOfLines: Controls text truncation
                        - onPress: Handles tap events to expand/collapse text */}
                    <CustomText
                        text={longText}
                        numberOfLines={expanded ? undefined : 2}
                        onPress={() => setExpanded(!expanded)}
                        style={styles.marginBottom}
                    />
                    {/* In this example, otherProps will contain:
                        {
                            size: 12,
                            color: "#666",
                            align: "center"
                        }
                        These are custom props that affect text appearance */}
                    <CustomText
                        text={`Tap to ${expanded ? 'collapse' : 'expand'}`}
                        size={12}
                        color="#666"
                        align="center"
                        style={styles.italic}
                    />
                </View>
            </View>

            {/* Implementation Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Implementation</Text>
                <View style={styles.card}>
                    <Text style={styles.code}>
{`const CustomText = (props) => {
    const { text, style, ...otherProps } = props
    return (
        <Text style={[styles.customText, style]} {...otherProps}>
            {text}
        </Text>
    )
}`}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default TextScreen

const styles = StyleSheet.create({
    ...commonStyles,
    customText: {
        fontSize: theme.typography.sizes.medium,
        color: theme.colors.text.secondary,
        fontWeight: theme.typography.weights.regular,
    },
    largeText: {
        fontSize: theme.typography.sizes.xlarge,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.primary,
    },
    lightText: {
        fontWeight: theme.typography.weights.light,
        color: theme.colors.accent1,
    },
    regularText: {
        color: theme.colors.accent2,
    },
    boldText: {
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.accent3,
    },
    leftText: {
        textAlign: 'left',
    },
    centerText: {
        textAlign: 'center',
    },
    rightText: {
        textAlign: 'right',
    },
    italic: {
        fontStyle: 'italic',
    },
    code: {
        fontFamily: 'monospace',
        fontSize: theme.typography.sizes.small,
        color: theme.colors.text.secondary,
    },
})
