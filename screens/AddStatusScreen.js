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

export default function AddStatusScreen({ navigation }) {
  const { state, dispatch } = useAssets();
  const [status, setStatus] = useState('');

  const handleAdd = () => {
    const trimmed = status.trim();
    if (!trimmed) return;

    if (state.statuses.includes(trimmed)) {
      ToastAndroid.show('Status already exists!', ToastAndroid.SHORT);
      return;
    }

    dispatch({ type: 'ADD_STATUS', payload: trimmed });
    ToastAndroid.show('Status added successfully!', ToastAndroid.SHORT);
    setStatus('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Add New Status</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter status"
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <MaterialIcons name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}> Add Status</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Existing Statuses:</Text>
      <FlatList
        data={state.statuses}
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
