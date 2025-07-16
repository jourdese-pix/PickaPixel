import React, { useEffect, useState, useCallback } from 'react';
import { Platform, View, Text, Image, Pressable, ActivityIndicator, Linking, AppState, FlatList } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';

// Permissions helper
const getPermissions = async () => {
  let permissionImages, permissionVideos;
  if (Platform.OS === 'ios') {
    permissionImages = PERMISSIONS.IOS.PHOTO_LIBRARY;
    permissionVideos = PERMISSIONS.IOS.PHOTO_LIBRARY;
  } else if (Platform.OS === 'android') {
    const apiLevel = Platform.Version;
    if (apiLevel >= 33) {
      permissionImages = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      permissionVideos = PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
    } else {
      permissionImages = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      permissionVideos = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }
  } else {
    throw new Error('Unsupported platform');
  }
  const checkAndRequest = async (perm) => {
    let result = await check(perm);
    if (result !== RESULTS.GRANTED) {
      result = await request(perm);
    }
    return result === RESULTS.GRANTED;
  };
  const hasImagePerm = await checkAndRequest(permissionImages);
  const hasVideoPerm = await checkAndRequest(permissionVideos);
  return hasImagePerm || hasVideoPerm;
};

// Async file size utility for iOS/Android
export const getSelectedFilesSize = async (selectedList) => {
  let total = 0;
  for (const item of selectedList) {
    if (item.image.fileSize && typeof item.image.fileSize === 'number') {
      total += item.image.fileSize;
    } else if (item.image.uri) {
      try {
        let path = item.image.uri;
        // On Android, uri may be content://, on iOS file://
        if (Platform.OS === 'ios' && path.startsWith('file://')) {
          path = path.replace('file://', '');
        }
        // On Android, try to resolve content:// to file path if possible
        if (Platform.OS === 'android' && path.startsWith('content://')) {
          // Try to copy to cache and stat (react-native-fs can't stat content:// directly)
          const destPath = `${RNFS.CachesDirectoryPath}/${Math.random().toString(36).substring(2, 15)}`;
          await RNFS.copyFile(path, destPath);
          const stat = await RNFS.stat(destPath);
          total += stat.size;
          await RNFS.unlink(destPath);
        } else {
          const stat = await RNFS.stat(path);
          total += stat.size;
        }
      } catch (e) {
        // ignore or handle error
      }
    }
  }
  return total;
};

const PhotoVideoLibrary = ({ onSelectionDone, first = 30 }) => {
  const [media, setMedia] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(Platform.OS === 'ios');
  const [endCursor, setEndCursor] = useState(null);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [selectedSizeMB, setSelectedSizeMB] = useState('0.00');
  const [disableDone, setDisableDone] = useState(false);

  // Permission and AppState logic
  useEffect(() => {
    let isActive = true;
    const checkAndFetch = async () => {
      setLoading(true);
      try {
        const granted = await getPermissions();
        if (!isActive) return;
        setHasPermission(granted);
        if (granted) fetchMedia();
      } finally {
        if (isActive) setLoading(false);
      }
    };
    checkAndFetch();
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') checkAndFetch();
    });
    return () => {
      isActive = false;
      subscription.remove();
    };
  }, []);

  // Fetch media
  const fetchMedia = async (after = null) => {
    if (fetchingMore) return;
    setFetchingMore(true);
    try {
      const res = await CameraRoll.getPhotos({
        first,
        assetType: 'All',
        after: after || undefined,
      });
      setEndCursor(res.page_info.end_cursor);
      setMedia((prev) => after ? [...prev, ...res.edges.map((e) => e.node)] : res.edges.map((e) => e.node));
    } finally {
      setFetchingMore(false);
    }
  };

  // Select/deselect
  const handleSelect = (item) => {
    setSelected((prev) => {
      if (prev.find((i) => i.image.uri === item.image.uri)) {
        return prev.filter((i) => i.image.uri !== item.image.uri);
      } else {
        return [...prev, item];
      }
    });
  };

  // Done
  const handleDone = () => {
    if (onSelectionDone) onSelectionDone(selected);
    setSelected([]);
  };

  // Update file size every time selection changes
  useEffect(() => {
    let isMounted = true;
    const updateSize = async () => {
      let totalSizeBytes = 0;
      try {
        totalSizeBytes = await getSelectedFilesSize(selected);
      } catch (e) {
        totalSizeBytes = 0;
      }
      if (isMounted) {
        const mb = (totalSizeBytes / (1024 * 1024));
        setSelectedSizeMB(mb.toFixed(2));
        setDisableDone(mb > 6);
      }
    };
    updateSize();
    return () => { isMounted = false; };
  }, [selected]);

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', margin: 16 }}>
          Permission required to access your photos and videos.
        </Text>
        <Pressable onPress={() => Linking.openSettings()} style={{ padding: 12, backgroundColor: '#2196f3', borderRadius: 8 }}>
          <Text style={{ color: 'white' }}>Open Settings</Text>
        </Pressable>
      </View>
    );
  }
  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', marginVertical: 8 }}>
        Selected size: {selectedSizeMB} MB
      </Text>
      <FlatList
        data={media}
        keyExtractor={(item) => item.image.uri}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flex: 1 / 3,
              aspectRatio: 1,
              margin: 4,
              borderWidth: selected.find((i) => i.image.uri === item.image.uri) ? 2 : 0,
              borderColor: '#4caf50',
              borderRadius: 8,
              overflow: 'hidden',
            }}
            onPress={() => handleSelect(item)}
          >
            <Image source={{ uri: item.image.uri }} style={{ flex: 1, width: '100%', height: '100%' }} resizeMode="cover" />
          </Pressable>
        )}
        onEndReached={() => endCursor && fetchMedia(endCursor)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={fetchingMore ? <ActivityIndicator /> : null}
      />
      {onSelectionDone && (
        <Pressable
          onPress={handleDone}
          style={{
            margin: 16,
            backgroundColor: disableDone ? '#aaa' : '#4caf50',
            borderRadius: 8,
            padding: 12,
            alignItems: 'center',
            opacity: disableDone ? 0.6 : 1,
          }}
          disabled={disableDone}
        >
          <Text style={{ color: 'white' }}>{selected.length ? `Done (${selected.length})` : 'Done'}</Text>
          {disableDone && (
            <Text style={{ color: 'yellow', fontSize: 12, marginTop: 4 }}>Max 6MB allowed</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default PhotoVideoLibrary;

