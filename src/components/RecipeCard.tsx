import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.name}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <View style={styles.tagContainer}>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientTag}>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={styles.instructions}>{recipe.instructions}</Text>
      </View>

      {recipe.usedItems && recipe.usedItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.usedItemsTitle}>Uses items from your receipt:</Text>
          <View style={styles.tagContainer}>
            {recipe.usedItems.map((item, index) => (
              <View key={index} style={styles.usedItemTag}>
                <Text style={styles.usedItemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientTag: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ingredientText: {
    color: '#f57c00',
    fontSize: 14,
    fontWeight: '500',
  },
  instructions: {
    color: '#555',
    fontSize: 16,
    lineHeight: 24,
  },
  usedItemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
    marginBottom: 8,
  },
  usedItemTag: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  usedItemText: {
    color: '#2e7d32',
    fontSize: 14,
    fontWeight: '500',
  },
});