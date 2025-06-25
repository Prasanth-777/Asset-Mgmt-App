import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAssets } from '../context/AssestContext.js';

export default function EditAssetScreen({ route, navigation }) {
  const { asset } = route.params;
  const { state, dispatch } = useAssets();

  const [name, setName] = useState(asset.name);
  const [category, setCategory] = useState(asset.category);
  const [status, setStatus] = useState(asset.status);
  const [purchaseDate, setPurchaseDate] = useState(new Date(asset.purchaseDate));
  const [warrantyDate, setWarrantyDate] = useState(new Date(asset.warrantyDate));

  const [showPurchasePicker, setShowPurchasePicker] = useState(false);
  const [showWarrantyPicker, setShowWarrantyPicker] = useState(false);

  const handleUpdate = () => {
    dispatch({
      type: 'UPDATE_ASSET',
      payload: {
        id: asset.id,
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Edit Asset</Text>

        <TextInput
          style={styles.input}
          placeholder="Asset Name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={category} onValueChange={setCategory}>
            {state.categories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={status} onValueChange={setStatus}>
            {state.statuses.map((st) => (
              <Picker.Item key={st} label={st} value={st} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Purchase Date</Text>
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

        <Text style={styles.label}>Warranty Date</Text>
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

       <TouchableOpacity style={styles.uploadButton} onPress={handleUpdate}>
        <MaterialIcons name="cloud-upload" size={20} color="#fff" />
        <Text style={styles.uploadText}> Update</Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  inner: {marginTop:40, padding: 20, flexGrow: 1 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: { fontWeight: '600', marginBottom: 5, marginTop: 10 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  uploadButton: {
  flexDirection: 'row',
  backgroundColor: '#4FC3F7', // blueish green
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
},
uploadText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
