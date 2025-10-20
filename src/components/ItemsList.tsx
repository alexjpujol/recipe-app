import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface ItemsListProps {
  items: string[];
}

export const ItemsList: React.FC<ItemsListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No items found in the receipt</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Items Found</Text>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemTag}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  itemTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  itemText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});