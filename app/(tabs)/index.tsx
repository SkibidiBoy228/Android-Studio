import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import ProductSkeleton from '../../components/ProductSkeletion';

const skeletonData = Array.from({ length: 8 }, (_, i) => ({ id: i.toString() }));

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts([
        { id: '1', title: 'Product 1' },
        { id: '2', title: 'Product 2' },
        { id: '3', title: 'Product 3' },
        { id: '4', title: 'Product 4' },
        { id: '5', title: 'Product 5' },
        { id: '6', title: 'Product 6' },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.notFoundButton}
        onPress={() => router.push('/wrong-page' as any)}
      >
        <Text style={styles.buttonText}>Відкрити неіснуючу сторінку</Text>
      </Pressable>

      <Pressable
        style={styles.calculatorButton}
        onPress={() => router.push('/calculator')}
      >
        <Text style={styles.buttonText}>Відкрити калькулятор</Text>
      </Pressable>

      <Pressable
        style={styles.currencyButton}
        onPress={() => router.push('/currency' as any)}
      >
        <Text style={styles.buttonText}>Курси валют</Text>
      </Pressable>

      {loading ? (
        <FlatList
          data={skeletonData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={() => <ProductSkeleton />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <View style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },

  row: {
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    marginBottom: 16,
  },

  productImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
    borderRadius: 12,
    marginBottom: 8,
  },

  productTitle: {
    fontSize: 14,
    color: '#222',
  },

  notFoundButton: {
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  calculatorButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  currencyButton: {
  backgroundColor: '#34A853',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 10,
  marginBottom: 16,
  },
});