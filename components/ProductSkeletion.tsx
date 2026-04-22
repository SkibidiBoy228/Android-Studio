import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProductSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.line} />
      <View style={[styles.line, styles.shortLine]} />
    </View>
  );
}
 
const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(160,160,160,0.35)',
    borderRadius: 12,
    marginBottom: 10,
  },
  line: {
    height: 10,
    backgroundColor: 'rgba(160,160,160,0.35)',
    borderRadius: 6,
    marginBottom: 6,
  },
  shortLine: {
    width: '65%',
  },
});