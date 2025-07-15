import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../theme';
import ScreenWrapper from './ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedNavigationButton = ({ title, to, style }) => {
  const navigation = useNavigation();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 5 }),
      withSpring(1, { damping: 5 })
    );

    setTimeout(() => {
      navigation.navigate(to);
    }, 200); // Slight delay to let the animation play
  };

  return (
    <AnimatedPressable style={[styles.button, style, animatedStyle]} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </AnimatedPressable>
  );
};

const SharedElementJ = () => {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Test Animation</Text>
      <View style={styles.buttonRow}>
        <AnimatedNavigationButton title="A1" to="A1" />
        <AnimatedNavigationButton title="A2" to="A2" />
        <AnimatedNavigationButton title="A3" to="A3" />
        <AnimatedNavigationButton title="A4" to="A4" />
      </View>
      <Text style={styles.title}>Gorhom bottom sheet</Text>
        <View style={styles.buttonRow}>
            <AnimatedNavigationButton title="View" to="G1 - View" />
            <AnimatedNavigationButton title="ScrollView" to="G2 - ScrollView" />         
        </View>
        <View style={styles.buttonRow}>
            <AnimatedNavigationButton title="FlashList" to="G3 - FlashList" />
            <AnimatedNavigationButton title="SectionList" to="G4 - SectionList" />
        </View>
        <View style={styles.buttonRow}>
            <AnimatedNavigationButton title="VirtualizedList" to="G5 - VirtualizedList" />
            <AnimatedNavigationButton title="Backdrop" to="G6 - Backdrop" />

        </View>
        <View style={styles.buttonRow}>
            <AnimatedNavigationButton title="Footer" to="G7 - Footer" />
            <AnimatedNavigationButton title="TextInput" to="G8 - TextInput" />
        </View>

    </ScreenWrapper>
  );
};

export default SharedElementJ;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: theme.primary || '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8, // ← add this line
    marginVertical: 8,   // ← optional vertical spacing too
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
