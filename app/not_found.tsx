import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.text}>Сторінку не знайдено</Text>

      <Link href="/" style={styles.button}>
        Повернутися на головну
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    overflow: 'hidden',
  },
});