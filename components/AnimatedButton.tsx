import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  wide?: boolean;
};

export default function AnimatedButton({ text, onPress, wide }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, {
      toValue: 1.12,
      useNativeDriver: true,
    }).start();
  }

  function pressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Pressable
      style={[styles.wrapper, wide && styles.wideWrapper]}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '23%',
    height: 58,
  },

  wideWrapper: {
    width: '48.5%',
  },

  button: {
    flex: 1,
    backgroundColor: '#b92424',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#111',
    fontSize: 18,
    fontWeight: '700',
  },
});