import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

const App = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleButtonClick = () => {
    console.log('Button Clicked');
    // Handle your button logic here (e.g., submit input or perform an action)
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
      >
        {/* BottomSheet Content */}
        <View style={styles.sheetContent}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.contentText}>Awesome 🎉</Text>
        </BottomSheetView>
          <BottomSheetTextInput style={styles.input} placeholder="Enter text..." />
          <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>


      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f0f0', // Lighter background for contrast
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  input: {
    marginTop: 40,
    marginBottom: 16,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 20,
    padding: 12,
    backgroundColor: 'rgba(151, 151, 151, 0.2)', // Soft background color for the input
    width: '100%',
    maxWidth: 320, // Responsive max width
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320, // Responsive max width
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default App;
