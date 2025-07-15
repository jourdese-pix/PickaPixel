import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const App = () => {
  const sheetRef = useRef(null);

  const data = useMemo(() =>
    Array(50)
      .fill(0)
      .map((_, index) => `index-${index}`),
    []
  );

  const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Button Group with G2 Styles */}
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

      {/* BottomSheet with FlatList */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
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
    alignItems: 'center', // Center buttons vertically
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

export default App;
