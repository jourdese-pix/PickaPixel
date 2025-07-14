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
    fontWeight: 'bold',
  },
});
