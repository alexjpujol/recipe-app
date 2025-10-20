import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { ImagePickerResult } from '../types';

interface ImagePickerComponentProps {
  onImageSelected: (image: ImagePickerResult) => void;
}

export const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  onImageSelected,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      
      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        Alert.alert(
          'Permissions Required',
          'This app needs camera and media library permissions to work properly.'
        );
        return false;
      }
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        onImageSelected({
          uri: asset.uri,
          type: asset.type || 'image',
          name: asset.fileName,
          base64: asset.base64,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
      console.error('Gallery picker error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const takePhotoWithCamera = async () => {
    setIsLoading(true);
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        onImageSelected({
          uri: asset.uri,
          type: asset.type || 'image',
          name: asset.fileName,
          base64: asset.base64,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
      console.error('Camera error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.uploadIcon}>📷</Text>
        <Text style={styles.uploadText}>
          Upload your receipt to discover recipes
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cameraButton]}
            onPress={takePhotoWithCamera}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>📱 Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.galleryButton]}
            onPress={pickImageFromGallery}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>📁 Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
        
        {isLoading && (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  uploadArea: {
    borderWidth: 3,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  uploadIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 150,
  },
  cameraButton: {
    backgroundColor: '#667eea',
  },
  galleryButton: {
    backgroundColor: '#764ba2',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic',
  },
});