import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert  } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
// import ViewShot from 'react-native-view-shot';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';
import Icon from '../assets/icons/Icon';
import { wp, hp } from '../helpers/common';
// import CameraRoll from '@react-native-community/cameraroll';
// import { Platform } from 'react-native';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const QRProfile2 = ({ route }) => {
  const viewRef = useRef();
  const { qrCodeUri, name, title, phone, email, website, cardtitle} = route.params;
  const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const now = new Date();
  const shortDate = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  // Download handler
// const handleDownload = async () => {
//   try {
//     // Request permission for iOS
//     if (Platform.OS === 'ios') {
//       const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
//       if (result !== RESULTS.GRANTED) {
//         Alert.alert('Permission denied', 'Cannot save image without photo library permission.');
//         return;
//       }
//     }
//   try {
//     const uri = await viewRef.current.capture();
//     if (Platform.OS === 'ios') {
//       // CameraRoll expects a file:// URI
//       const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`;
//       await CameraRoll.save(fileUri, { type: 'photo' });
//       Alert.alert('Saved!', 'Image saved to your Photos.');
//     } else {
//       const filePath = `${RNFS.PicturesDirectoryPath}/QR_${safeName}_${shortDate}.png`;
//       await RNFS.moveFile(uri, filePath);
//       Alert.alert('Saved!', `Image saved to: ${filePath}`);
//     }
//   } catch (e) {
//     Alert.alert('Error', e.message);
//   }
//   } catch (e) {
//     Alert.alert('Error', e.message);
//   }
// };
const handleDownload = async () => {
  try {
    // Request permission for iOS
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
      if (result !== RESULTS.GRANTED) {
        Alert.alert('Permission denied', 'Cannot save image without photo library permission.');
        return;
      }
    }
    const uri = await viewRef.current.capture();
    const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`;

    // Check if file exists before saving
    const exists = await RNFS.exists(uri);
    if (!exists) {
      Alert.alert('Error', 'Image file does not exist.');
      return;
    }

    await CameraRoll.save(fileUri, { type: 'photo' });
    Alert.alert('Saved!', 'Image saved to your Photos.');
  } catch (e) {
    Alert.alert('Error', e.message || 'Failed to save image.');
  }
};
// const handleDownload = async () => {
  // try {
  //   const uri = await viewRef.current.capture();
  //   if (Platform.OS === 'ios') {
  //     // CameraRoll expects a file:// URI
  //     const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`;
  //     await CameraRoll.save(fileUri, { type: 'photo' });
  //     Alert.alert('Saved!', 'Image saved to your Photos.');
  //   } else {
  //     const filePath = `${RNFS.PicturesDirectoryPath}/QR_${safeName}_${shortDate}.png`;
  //     await RNFS.moveFile(uri, filePath);
  //     Alert.alert('Saved!', `Image saved to: ${filePath}`);
  //   }
  // } catch (e) {
  //   Alert.alert('Error', e.message);
  // }
// };

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
    // <ScreenWrapper bg="#f5f7fa">
    //   <ViewShot ref={viewRef} options={{ format: 'png', quality: 1.0 }} >
    //     <View style={styles.screenshotbg}>
    //       <View style={styles.container}>
    //         <View style={styles.card}>
    //           {/* Pixelmine Logo */}
    //           <Image
    //             source={require('../assets/Logo.png')}
    //             style={styles.logo}
    //             resizeMode="contain"
    //           />
    //           <View style={styles.cardTitleContainer}>
    //             <Text style={styles.cardTitleText}>{cardtitle}</Text>
    //           </View>
    //           <Image source={{ uri: qrCodeUri }} style={styles.qrCode} />

    //           <Text style={styles.name}>{name}</Text>
    //           <Text style={styles.title}>{title}</Text>

    //           <View style={styles.separator} />

    //           <View style={styles.contactBlock}>
    //             <View style={styles.detailRow}>
    //               <View style={styles.detailRowIcon}>
    //                 <Icon name="phone" height="16" width="16"/> 
    //               </View>
    //             <Text style={styles.detail}>  {phone}</Text>
    //             </View>
    //             <View style={styles.detailRow}>
    //               <View style={styles.detailRowIcon}>
    //                 <Icon name="mail" height="16" width="16"/>
    //               </View>
    //               <Text style={styles.detail}>  {email}</Text>
    //             </View>
    //             <View style={styles.detailRow}>
    //               <View style={styles.detailRowIcon}>
    //                 <Icon name="earth" height="16" width="16"/>
    //               </View>
    //               <Text style={styles.detail}>  {website}</Text>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //   </ViewShot>
    //   <View style={styles.actions}>
    //     <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
    //       <Text style={styles.actionText}>Download QR</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
    //       <Text style={styles.actionText}>Share</Text>
    //     </TouchableOpacity>
    //   </View>
    // </ScreenWrapper>
    <>
    <Text>Hi</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: wp(6), // ~24 on most phones
  },
  card: {
    width: '100%',
    borderRadius: wp(5), // responsive border radius
    padding: wp(6), // responsive padding
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logo: {
    width: wp(50), // 50% of screen width
    height: hp(6), // 6% of screen height
    marginBottom: hp(3),
    alignSelf: 'center',
  },
  qrCode: {
    width: wp(40), // 40% of screen width
    height: wp(40), // keep square
    marginBottom: hp(2.5),
  },
  name: {
    fontSize: wp(6), // responsive font size
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  title: {
    fontSize: wp(4), // responsive font size
    color: '#6b7280',
    marginBottom: hp(2),
  },
  separator: {
    height: 1,
    width: '85%',
    backgroundColor: '#e5e7eb',
    marginVertical: hp(2),
  },
  contactBlock: {
    width: '100%',
    paddingHorizontal: wp(2.5),
  },
  detail: {
    fontSize: wp(3.8),
    color: '#374151',
    marginBottom: hp(1),
    letterSpacing: 0.2,
  },
  screenshotbg: {
    backgroundColor: 'transparent', 
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',      
    marginTop: hp(4),
    marginRight: wp(4),
    gap: 10,                 
  },
  actionButton: {
    backgroundColor: '#16733e',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    marginLeft: wp(2),
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  detailRowIcon: {
    marginBottom: 6,
  },
cardTitleContainer: {
  marginBottom: hp(2),
  paddingVertical: hp(1),
  paddingHorizontal: wp(6),
  backgroundColor: '#e6f4ea',
  borderRadius: wp(3),
  alignSelf: 'center',
  shadowColor: '#16733e',
  shadowOpacity: 0.09,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},
cardTitleText: {
  fontSize: wp(3),
  fontWeight: 'bold',
  color: '#16733e',
  letterSpacing: 1,
  textAlign: 'center',
  textTransform: 'uppercase',
},
});

export default QRProfile2;