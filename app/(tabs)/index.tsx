import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import ProductSkeleton from '../../components/ProductSkeletion';
import { router } from 'expo-router';
import MemoryButton from '../../components/MemoryButton'
import { MemoryButtonTypes } from '../../constants/MemoryButtonTypes'
import { formatNumber, canAddDigit, removeLast } from '../../utils/formatNumber';

const skeletonData = Array.from({ length: 8 }, (_, i) => ({ id: i.toString() }));

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<{ id: string; title: string }[]>([]);
  const memoryButtons = [
  { text: 'MC', type: MemoryButtonTypes.disabled },
  { text: 'MR', type: MemoryButtonTypes.disabled },
  { text: 'M+', type: MemoryButtonTypes.enabled },
  { text: 'M-', type: MemoryButtonTypes.enabled },
  { text: 'MS', type: MemoryButtonTypes.enabled },
  { text: 'Mv', type: MemoryButtonTypes.enabled },
  ];
  const [display, setDisplay] = useState('0');

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

  function addDigit(digit: string) {
  let clean = display.replace(/[\s\u202F]/g, '');

  if (!canAddDigit(clean)) return;

  const next = clean === '0' ? digit : clean + digit;

  setDisplay(formatNumber(next));
}

function deleteDigit() {
  setDisplay(removeLast(display));
}

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.notFoundButton}
        onPress={() => router.push('/wrong-page' as any)}
      >
        <Text style={styles.notFoundButtonText}>Відкрити неіснуючу сторінку</Text>
      </Pressable>

      <Text style={styles.displayText}>{display}</Text>

      <View style={styles.calcTestButtons}>
        <Pressable style={styles.calcButton} onPress={() => addDigit('1')}>
          <Text style={styles.calcButtonText}>1</Text>
        </Pressable>

        <Pressable style={styles.calcButton} onPress={() => addDigit('2')}>
          <Text style={styles.calcButtonText}>2</Text>
        </Pressable>

        <Pressable style={styles.calcButton} onPress={() => addDigit('3')}>
          <Text style={styles.calcButtonText}>3</Text>
        </Pressable>

        <Pressable style={styles.calcButton} onPress={deleteDigit}>
          <Text style={styles.calcButtonText}>DEL</Text>
        </Pressable>
      </View>

      <View style={styles.memoryContainer}>
        {memoryButtons.map((button) => (
          <MemoryButton
            key={button.text}
            text={button.text}
            type={button.type}
          />
        ))}
      </View>

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
  color: '#fff',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 10,
  textAlign: 'center',
  marginBottom: 16,
  overflow: 'hidden',
  
  },
  notFoundButtonText: {
  color: '#fff',
  textAlign: 'center',
  fontSize: 16,
  },
  memoryContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 8,
  marginBottom: 20,
  paddingHorizontal: 4,
  },
  displayText: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 16,
  },

  calcTestButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },

  calcButton: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  calcButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 