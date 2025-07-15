import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const G1 = () => {
  // refs
  const sheetRef = useRef(null);

  // snap points for the BottomSheet
  const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);

  // callback to handle snap changes
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  
  // callback to trigger snap to specific index
  const handleSnapPress = useCallback((index) => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(index); // Snap the BottomSheet to the desired index
    }
  }, []);

  // callback to close the BottomSheet
  const handleClosePress = useCallback(() => {
    if (sheetRef.current) {
      sheetRef.current.close(); // Close the BottomSheet
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Horizontal Button Container - arranged in a row */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button title="85%" onPress={() => handleSnapPress(2)} color="#28a745" />
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

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        initialSnapIndex={0} // Optional: Set the initial snap point
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🔥</Text>
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
    padding: 36,
    alignItems: 'center',
  },
});

export default G1;
