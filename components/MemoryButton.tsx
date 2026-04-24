import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MemoryButtonTypes, MemoryButtonType } from '@/constants/MemoryButtonTypes';

type MemoryButtonProps = {
  text: string;
  type: MemoryButtonType;
};

export default function MemoryButton({ text, type }: MemoryButtonProps) {
  const isDisabled = type === MemoryButtonTypes.disabled;

  return (
    <Pressable
      disabled={isDisabled}
      style={[
        styles.button,
        isDisabled ? styles.disabledButton : styles.enabledButton,
      ]}
    >
      <Text style={[styles.text, isDisabled && styles.disabledText]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    minWidth: 48,
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#222',
  },
  disabledButton: {
    backgroundColor: 'rgba(120,120,120,0.25)',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  disabledText: {
    color: '#999',
  },
});