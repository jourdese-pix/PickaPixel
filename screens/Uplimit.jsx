import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import ScreenWrapper from './ScreenWrapper';
import PhotoVideoLibrary, { getSelectedFilesSize } from './photovideolibrary';

const Uplimit = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [totalSizeMB, setTotalSizeMB] = useState('0.00');
  const [showSize, setShowSize] = useState(false);

  const handleSelectionDone = useCallback(async (assets) => {
    setSelectedAssets(assets);
    let totalSizeBytes = 0;
    try {
      totalSizeBytes = await getSelectedFilesSize(assets);
    } catch (e) {
      totalSizeBytes = 0;
    }
    setTotalSizeMB(((totalSizeBytes || 0) / (1024 * 1024)).toFixed(2));
    setShowSize(true);
    setShowPicker(false);
  }, []);

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Upload Size Limiter</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Upload Photo/Video"
          onPress={() => {
            setShowPicker(true);
            setShowSize(false);
          }}
        />
      </View>

      {showPicker && (
        <PhotoVideoLibrary onSelectionDone={handleSelectionDone} />
      )}

      {showSize && (
        <Text style={styles.sizeText}>
          Total selected size: {totalSizeMB} MB
        </Text>
      )}

      <ScrollView horizontal style={styles.scrollView}>
        {selectedAssets.map((item, idx) => (
          <Image
            key={item.image.uri || idx}
            source={{ uri: item.image.uri }}
            style={styles.thumbnail}
          />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Uplimit;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sizeText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollView: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
});
