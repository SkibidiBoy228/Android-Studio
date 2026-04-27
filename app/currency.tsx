import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';

type CurrencyRate = {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
};

export default function CurrencyScreen() {
  const [date, setDate] = useState('2020-03-02');
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function formatDateForApi(value: string) {
    return value.replaceAll('-', '');
  }

  async function loadRates() {
    try {
      setLoading(true);
      setError('');

      const apiDate = formatDateForApi(date);

      if (apiDate.length !== 8) {
        setError('Введіть дату у форматі YYYY-MM-DD');
        return;
      }

      const response = await fetch(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${apiDate}&json`
      );

      const data = await response.json();
      setRates(data);
    } catch {
      setError('Помилка завантаження курсів валют');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Назад</Text>
      </Pressable>

      <Text style={styles.title}>Курси валют НБУ</Text>

      <Text style={styles.label}>Оберіть дату:</Text>

      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Pressable style={styles.loadButton} onPress={loadRates}>
        <Text style={styles.loadButtonText}>Завантажити курси</Text>
      </Pressable>

      {loading && <ActivityIndicator size="large" />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={rates}
        keyExtractor={(item) => item.cc}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.currencyCode}>{item.cc}</Text>
            <Text style={styles.currencyName}>{item.txt}</Text>
            <Text style={styles.rate}>Курс: {item.rate}</Text>
            <Text style={styles.date}>Дата: {item.exchangedate}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
    color: '#222',
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
  },

  loadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },

  loadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  error: {
    color: 'red',
    marginBottom: 12,
    fontSize: 15,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  currencyCode: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  currencyName: {
    fontSize: 15,
    color: '#333',
    marginTop: 4,
  },

  rate: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#111',
  },

  date: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});