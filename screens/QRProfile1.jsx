import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

const QRProfile1 = ({ route }) => {
  const { qrCodeUri, name, title, phone, email, website } = route.params;
  return (
    <ScreenWrapper>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.qrBlock}>
            <Image source={{ uri: qrCodeUri }} style={styles.qrCode} />
          </View>
          <View style={styles.infoContainer}>
            <Image
              source={require('../assets/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.separator} />
          </View>
        </View>
        <View style={styles.contactBlock}>
          <Text style={styles.detail}>📞   {phone}</Text>
          <Text style={styles.detail}>✉️   {email}</Text>
          <Text style={styles.detail}>🌐   {website}</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 36,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  qrBlock: {
    alignItems: 'center',
    marginRight: 28,
    flex: 0,
  },
  qrCode: {
    width: 140,
    height: 140,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
    width: 140,
    height: 32,
    marginBottom: 18,
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    color: '#1f2937',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 10,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#e5e7eb',
    marginVertical: 10,
  },
  contactBlock: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'flex-start',
    width: '100%',
  },
  detail: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 6,
    letterSpacing: 0.1,
  },
});

export default QRProfile1;