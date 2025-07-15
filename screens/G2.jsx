import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const G2 = () => {
  // refs
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render item for the BottomSheet scroll view
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

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

      {/* BottomSheet */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        initialSnapIndex={0}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {data.map(renderItem)}
        </BottomSheetScrollView>
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
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default G2;
