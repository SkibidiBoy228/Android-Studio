import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SwipeMoveAnimation() {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [status, setStatus] = useState('Очікує свайп');

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          Math.abs(gestureState.dx) > 20 ||
          Math.abs(gestureState.dy) > 20
        );
      },

      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy } = gestureState;

        let targetX = 0;
        let targetY = 0;
        let direction = '';

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 50) {
            targetX = 160;
            direction = 'праворуч';
          } else if (dx < -50) {
            targetX = -160;
            direction = 'ліворуч';
          }
        } else {
          if (dy > 50) {
            targetY = 90;
            direction = 'вниз';
          } else if (dy < -50) {
            targetY = -90;
            direction = 'вгору';
          }
        }

        if (!direction) {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
          return;
        }

        setStatus(`Свайп ${direction}: анімація запущена`);

        Animated.sequence([
          Animated.timing(position, {
            toValue: { x: targetX, y: targetY },
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setStatus(`Стан змінено після свайпу ${direction}`);
        });
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Анімація свайпів</Text>
      <Text style={styles.status}>{status}</Text>

      <View style={styles.area}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.box,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
              ],
            },
          ]}
        >
          <Text style={styles.boxText}>Swipe</Text>
        </Animated.View>
      </View>
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
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
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
});