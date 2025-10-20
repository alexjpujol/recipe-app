import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ImagePickerComponent } from '../components/ImagePickerComponent';
import { ItemsList } from '../components/ItemsList';
import { RecipeCard } from '../components/RecipeCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { analyzeReceipt } from '../services/claudeApi';
import { ReceiptAnalysis, ImagePickerResult } from '../types';

export const HomeScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImagePickerResult | null>(null);
  const [analysis, setAnalysis] = useState<ReceiptAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelected = (image: ImagePickerResult) => {
    setSelectedImage(image);
    setAnalysis(null);
  };

  const handleAnalyzeReceipt = async () => {
    if (!selectedImage || !selectedImage.base64) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeReceipt(selectedImage.uri, selectedImage.base64);
      setAnalysis(result);
      
      if (result.error) {
        Alert.alert('Analysis Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze receipt. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    setSelectedImage(null);
    setAnalysis(null);
    setIsAnalyzing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🧾 Receipt Recipe Parser</Text>
          <Text style={styles.headerSubtitle}>
            Upload a receipt photo and discover delicious recipes!
          </Text>
        </View>

        {/* Image Selection */}
        {!selectedImage && (
          <ImagePickerComponent onImageSelected={handleImageSelected} />
        )}

        {/* Image Preview */}
        {selectedImage && !analysis && (
          <View style={styles.previewSection}>
            <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.analyzeButton]}
                onPress={handleAnalyzeReceipt}
                disabled={isAnalyzing}
              >
                <Text style={styles.buttonText}>
                  {isAnalyzing ? 'Analyzing...' : '🔍 Analyze Receipt'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleStartOver}
              >
                <Text style={styles.secondaryButtonText}>🔄 Start Over</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <LoadingSpinner message="Analyzing your receipt and finding recipes..." />
        )}

        {/* Results */}
        {analysis && !isAnalyzing && (
          <View style={styles.resultsSection}>
            <ItemsList items={analysis.items} />
            
            <View style={styles.recipesSection}>
              <Text style={styles.sectionTitle}>👨‍🍳 Recipe Suggestions</Text>
              {analysis.recipes && analysis.recipes.length > 0 ? (
                analysis.recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))
              ) : (
                <Text style={styles.noRecipesText}>
                  No recipes could be generated from the receipt items.
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton, styles.startOverButton]}
              onPress={handleStartOver}
            >
              <Text style={styles.secondaryButtonText}>🔄 Analyze Another Receipt</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#667eea',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  previewSection: {
    padding: 20,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 150,
  },
  analyzeButton: {
    backgroundColor: '#667eea',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultsSection: {
    padding: 20,
  },
  recipesSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  noRecipesText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
  },
  startOverButton: {
    alignSelf: 'center',
    marginTop: 30,
  },
});