import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const QRProfile = ({ route }) => {
  const { qrCodeUri, name, title, phone, email, website } = route.params;
  const viewRef = useRef();

  // Download handler
  const handleDownload = async () => {
    try {
      const uri = await viewRef.current.capture();
      const filePath = `${RNFS.PicturesDirectoryPath}/businesscard_${Date.now()}.png`;
      await RNFS.moveFile(uri, filePath);
      Alert.alert('Saved!', `Image saved to: ${filePath}`);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  // Share handler
  const handleShare = async () => {
    try {
      const uri = await viewRef.current.capture();
      await Share.open({
        url: 'file://' + uri,
        type: 'image/png',
      });
    } catch (e) {
      if (e.message !== 'User did not share') {
        Alert.alert('Error', e.message);
      }
    }
  };

  return (
    <ScreenWrapper>
      <ViewShot ref={viewRef} options={{ format: 'png', quality: 1.0 }} >
        <View style={styles.screenshotbg}>
          <View style={styles.logoRow}>
            <Image
              source={require('../assets/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.card}>
            <View style={styles.left}>
              <Image source={{ uri: qrCodeUri }} style={styles.qrCode} />
            </View>
            <View style={styles.right}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.separator} />
            </View>
          </View>
          <View style={styles.contactBlock}>
            <Text style={styles.detail}>📞 {phone}</Text>
            <Text style={styles.detail}>✉️ {email}</Text>
            <Text style={styles.detail}>🌐 {website}</Text>
          </View>
        </View>
      </ViewShot>
        <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Text style={styles.actionText}>Download QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenshotbg: {
    backgroundColor: '#F2F2F2',
  },
actions: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',      // ← add this to center vertically
  marginTop: 30,
  marginRight: 16,
  gap: 10,                   // works if you're on React Native ≥ 0.71
},
  actionButton: {
    backgroundColor: '#16733e',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  // ...rest of your styles
  logoRow: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 12,
  },
  logo: {
    width: 150,
    height: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 36,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
    alignItems: 'center',
    width: '94%',
    alignSelf: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  left: {
    marginRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCode: {
    width: 130,
    height: 130,
    backgroundColor: '#f8fafc',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 17,
    color: '#4b5563',
    marginBottom: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  separator: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#e5e7eb',
    marginVertical: 14,
    borderRadius: 1,
  },
  contactBlock: {
    marginTop: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '92%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  detail: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 10,
    flexShrink: 1,
    letterSpacing: 0.1,
    marginBottom: 6,
  },
});

export default QRProfile;