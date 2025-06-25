import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAssets } from '../context/AssestContext.js';

export default function AddAssetScreen({ navigation }) {
  const { state, dispatch } = useAssets();

  const [name, setName] = useState('');
  const [category, setCategory] = useState(state.categories[0]);
  const [status, setStatus] = useState(state.statuses[0]);
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [warrantyDate, setWarrantyDate] = useState(new Date());

  const [showPurchasePicker, setShowPurchasePicker] = useState(false);
  const [showWarrantyPicker, setShowWarrantyPicker] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setName('');
      setCategory(state.categories[0]);
      setStatus(state.statuses[0]);
      setPurchaseDate(new Date());
      setWarrantyDate(new Date());
    }, [state.categories, state.statuses])
  );

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Asset Name is required.');
      return;
    }

    dispatch({
      type: 'ADD_ASSET',
      payload: {
        id: Date.now().toString(),
        name,
        category,
        status,
        purchaseDate,
        warrantyDate,
      },
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add New Asset</Text>

        <TextInput
          style={styles.input}
          placeholder="Asset Name *"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Category *</Text>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
        >
          {state.categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>

        <Text style={styles.label}>Status *</Text>
        <Picker
          selectedValue={status}
          onValueChange={setStatus}
          style={styles.picker}
        >
          {state.statuses.map((st) => (
            <Picker.Item key={st} label={st} value={st} />
          ))}
        </Picker>

        <Text style={styles.label}>Purchase Date *</Text>
        <TouchableOpacity onPress={() => setShowPurchasePicker(true)}>
          <TextInput
            style={styles.input}
            value={purchaseDate.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>
        {showPurchasePicker && (
          <DateTimePicker
            value={purchaseDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowPurchasePicker(false);
              if (date) setPurchaseDate(date);
            }}
          />
        )}

        <Text style={styles.label}>Warranty Date *</Text>
        <TouchableOpacity onPress={() => setShowWarrantyPicker(true)}>
          <TextInput
            style={styles.input}
            value={warrantyDate.toLocaleDateString()}
            editable={false}
          />
        </TouchableOpacity>
        {showWarrantyPicker && (
          <DateTimePicker
            value={warrantyDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowWarrantyPicker(false);
              if (date) setWarrantyDate(date);
            }}
          />
        )}

        <View style={styles.buttonWrapper}>
          <Button title="Add Asset" onPress={handleAdd} color="#4CAF50" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
    color: '#444',
  },
  picker: {
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
