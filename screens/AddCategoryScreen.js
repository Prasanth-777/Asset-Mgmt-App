import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { useAssets } from '../context/AssestContext';

export default function AddCategoryScreen({ navigation }) {
  const { state, dispatch } = useAssets();
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    const trimmed = category.trim();
    if (!trimmed) return;

    // Avoid duplicates
    if (state.categories.includes(trimmed)) {
      ToastAndroid.show('Category already exists!', ToastAndroid.SHORT);
      return;
    }

    dispatch({ type: 'ADD_CATEGORY', payload: trimmed });
    ToastAndroid.show('Category added successfully!', ToastAndroid.SHORT);
    setCategory('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Add New Category</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter category name"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <MaterialIcons name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}> Add Category</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Existing Categories:</Text>
      <FlatList
        data={state.categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemBox}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 24,
    marginTop:50
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  itemBox: {
    backgroundColor: '#e6f5ea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
});
