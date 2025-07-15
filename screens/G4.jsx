import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlashList } from "@gorhom/bottom-sheet";

const keyExtractor = (item) => item;

const App = () => {
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
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(({ item }) => {
    return (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Button Group with G2 Styles */}
      <View style={styles.buttonRow}>
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

      {/* BottomSheet with FlashList */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
      >
        <BottomSheetFlashList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={43.3}
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
    alignItems: 'center', // Center buttons vertically in the row
    width: '90%', // Buttons will take 90% of the screen width
    marginBottom: 20, // Add space below the buttons
  },
  buttonContainer: {
    width: '22%', // Buttons will take up 22% of the row width to fit all 3 buttons
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
