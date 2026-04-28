import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import AnimatedButton from '../components/AnimatedButton';
import MemoryButton from '../components/MemoryButton';
import { MemoryButtonTypes } from '../constants/MemoryButtonTypes';
import { formatNumber, canAddDigit, removeLast } from '../utils/formatNumber';
import InfiniteTapAnimation from '../components/InfinityTapAnimation';
import SwipeMoveAnimation from '../components/SwipeMoveAnimation';

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const memoryButtons = [
    { text: 'MC', type: MemoryButtonTypes.disabled },
    { text: 'MR', type: MemoryButtonTypes.disabled },
    { text: 'M+', type: MemoryButtonTypes.enabled },
    { text: 'M-', type: MemoryButtonTypes.enabled },
    { text: 'MS', type: MemoryButtonTypes.enabled },
    { text: 'Mv', type: MemoryButtonTypes.enabled },
  ];

  function cleanValue(value: string): string {
    return value.replace(/[\s\u202F]/g, '');
  }

  function getNumber(): number {
    return Number(cleanValue(display));
  }

  function setResult(value: number) {
    if (!Number.isFinite(value)) {
      setDisplay('Error');
      return;
    }

    const fixed = Number(value.toFixed(8));
    setDisplay(formatNumber(String(fixed)));
  }

  function addDigit(digit: string) {
    if (display === 'Error') {
      setDisplay(digit);
      return;
    }

    const clean = cleanValue(display);

    if (!canAddDigit(clean)) return;

    const next = clean === '0' ? digit : clean + digit;
    setDisplay(formatNumber(next));
  }

  function addDot() {
    if (display === 'Error') {
      setDisplay('0.');
      return;
    }

    const clean = cleanValue(display);

    if (clean.includes('.')) return;

    setDisplay(clean + '.');
  }

  function deleteDigit() {
    if (display === 'Error') {
      setDisplay('0');
      return;
    }

    setDisplay(removeLast(display));
  }

  function clearCalculator() {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
  }

  function changeSign() {
    if (display === '0' || display === 'Error') return;

    const clean = cleanValue(display);
    const next = clean.startsWith('-') ? clean.slice(1) : '-' + clean;

    setDisplay(formatNumber(next));
  }

  function chooseOperation(selectedOperation: string) {
    if (display === 'Error') return;

    setFirstNumber(getNumber());
    setOperation(selectedOperation);
    setDisplay('0');
  }

  function calculateResult() {
    if (firstNumber === null || operation === null) return;

    const secondNumber = getNumber();

    if (operation === '+') {
      setResult(firstNumber + secondNumber);
    }

    if (operation === '-') {
      setResult(firstNumber - secondNumber);
    }

    if (operation === '*') {
      setResult(firstNumber * secondNumber);
    }

    if (operation === '/') {
      if (secondNumber === 0) {
        setDisplay('Error');
      } else {
        setResult(firstNumber / secondNumber);
      }
    }

    if (operation === '%') {
      setResult((firstNumber / 100) * secondNumber);
    }

    setFirstNumber(null);
    setOperation(null);
  }

  function squareNumber() {
    const value = getNumber();
    setResult(value * value);
  }

  function squareRootNumber() {
    const value = getNumber();

    if (value < 0) {
      setDisplay('Error');
      return;
    }

    setResult(Math.sqrt(value));
  }

  function trigAction(type: 'sin' | 'cos' | 'tan' | 'ctg') {
    const value = getNumber();
    const radians = (value * Math.PI) / 180;

    if (type === 'sin') {
      setResult(Math.sin(radians));
      return;
    }

    if (type === 'cos') {
      setResult(Math.cos(radians));
      return;
    }

    if (type === 'tan') {
      const cosValue = Math.cos(radians);

      if (Math.abs(cosValue) < 0.0000001) {
        setDisplay('Error');
        return;
      }

      setResult(Math.tan(radians));
      return;
    }

    if (type === 'ctg') {
      const sinValue = Math.sin(radians);

      if (Math.abs(sinValue) < 0.0000001) {
        setDisplay('Error');
        return;
      }

      setResult(1 / Math.tan(radians));
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Назад</Text>
      </Pressable>

      <InfiniteTapAnimation />

      <SwipeMoveAnimation />

      <Text style={styles.title}>Калькулятор</Text>

      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
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

      {isLandscape && (
        <View style={styles.row}>
          <AnimatedButton text="sin" onPress={() => trigAction('sin')} />
          <AnimatedButton text="cos" onPress={() => trigAction('cos')} />
          <AnimatedButton text="tan" onPress={() => trigAction('tan')} />
          <AnimatedButton text="ctg" onPress={() => trigAction('ctg')} />
        </View>
      )}

      <View style={styles.row}>
        <AnimatedButton text="C" onPress={clearCalculator} />
        <AnimatedButton text="+/-" onPress={changeSign} />
        <AnimatedButton text="√x" onPress={squareRootNumber} />
        <AnimatedButton text="x²" onPress={squareNumber} />
      </View>

      <View style={styles.row}>
        <AnimatedButton text="7" onPress={() => addDigit('7')} />
        <AnimatedButton text="8" onPress={() => addDigit('8')} />
        <AnimatedButton text="9" onPress={() => addDigit('9')} />
        <AnimatedButton text="÷" onPress={() => chooseOperation('/')} />
      </View>

      <View style={styles.row}>
        <AnimatedButton text="4" onPress={() => addDigit('4')} />
        <AnimatedButton text="5" onPress={() => addDigit('5')} />
        <AnimatedButton text="6" onPress={() => addDigit('6')} />
        <AnimatedButton text="×" onPress={() => chooseOperation('*')} />
      </View>

      <View style={styles.row}>
        <AnimatedButton text="1" onPress={() => addDigit('1')} />
        <AnimatedButton text="2" onPress={() => addDigit('2')} />
        <AnimatedButton text="3" onPress={() => addDigit('3')} />
        <AnimatedButton text="-" onPress={() => chooseOperation('-')} />
      </View>

      <View style={styles.row}>
        <AnimatedButton text="0" onPress={() => addDigit('0')} />
        <AnimatedButton text="." onPress={addDot} />
        <AnimatedButton text="DEL" onPress={deleteDigit} />
        <AnimatedButton text="+" onPress={() => chooseOperation('+')} />
      </View>

      <View style={styles.row}>
        <AnimatedButton text="%" onPress={() => chooseOperation('%')} />
        <AnimatedButton text="=" onPress={calculateResult} />
      </View>

      <Text style={styles.hint}>
        Для перевірки: 20 % 500 = 100.
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  backButton: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },

  backButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
  },

  display: {
    minHeight: 90,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  displayText: {
    fontSize: 42,
    fontWeight: '700',
    textAlign: 'right',
    color: '#111',
  },

  memoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  button: {
    flex: 1,
    backgroundColor: '#222',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wideButton: {
    flex: 3,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  hint: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});