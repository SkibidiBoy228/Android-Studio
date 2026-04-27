import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

export default function InfiniteTapAnimation() {
  const scale = useRef(new Animated.Value(1)).current;
  const shouldRepeat = useRef(false);
  const [isRunning, setIsRunning] = useState(false);

  function runAnimation() {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.35,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (shouldRepeat.current) {
        runAnimation();
      } else {
        setIsRunning(false);
      }
    });
  }

  function toggleAnimation() {
    if (!isRunning) {
      shouldRepeat.current = true;
      setIsRunning(true);
      runAnimation();
    } else {
      shouldRepeat.current = false;
    }
  }

  return (
    <Pressable style={styles.container} onPress={toggleAnimation}>
      <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
        <Text style={styles.text}>{isRunning ? 'Stop' : 'Start'}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },

  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});