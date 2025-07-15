import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const App = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Button Group with Custom Styles */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button title="75%" onPress={() => handleSnapPress(2)} color="#28a745" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="50%" onPress={() => handleSnapPress(1)} color="#218838" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="25%" onPress={() => handleSnapPress(0)} color="#1e7e34" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Close" onPress={handleClosePress} color="#155724" />
        </View>
      </View>

      {/* BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjusted padding for better visibility
    justifyContent: 'flex-start', // Keep content aligned to the top
    alignItems: 'center', // Center horizontally
  },
  buttonRow: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-evenly', // Evenly space buttons across the width
    alignItems: 'center', // Center buttons vertically in the row
    width: '90%', // Buttons will take 90% of the screen width
    marginBottom: 20, // Add space below the buttons
  },
  buttonContainer: {
    width: '22%', // Buttons will take up 22% of the row width to fit all 4 buttons
    borderRadius: 25, // Rounded corners for a softer look
    overflow: 'hidden', // Ensure rounded corners are applied
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
