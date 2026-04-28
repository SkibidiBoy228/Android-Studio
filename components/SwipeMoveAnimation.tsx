import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SwipeMoveAnimation() {
  const positionX = useRef(new Animated.Value(0)).current;
  const [status, setStatus] = useState('Очікує свайп');

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          setStatus('Анімація запущена');

          Animated.timing(positionX, {
            toValue: -180,
            duration: 700,
            useNativeDriver: true,
          }).start(() => {
            setStatus('Стан змінено після завершення');
          });
        } else {
          Animated.timing(positionX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  function resetAnimation() {
    positionX.setValue(0);
    setStatus('Очікує свайп');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Свайп ліворуч</Text>
      <Text style={styles.status}>{status}</Text>

      <View style={styles.area}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.box,
            {
              transform: [{ translateX: positionX }],
            },
          ]}
        >
          <Text style={styles.boxText}>Swipe</Text>
        </Animated.View>
      </View>

      <Text style={styles.reset} onPress={resetAnimation}>
        Скинути
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f3f3f3',
    borderRadius: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  status: {
    fontSize: 15,
    color: '#555',
    marginBottom: 16,
  },

  area: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },

  box: {
    width: 100,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  reset: {
    marginTop: 14,
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});