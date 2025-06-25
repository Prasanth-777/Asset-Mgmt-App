import { MaterialIcons } from '@expo/vector-icons';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAssets } from '../context/AssestContext.js';

export default function HomeScreen({ navigation }) {
  const { state, dispatch } = useAssets();

  const handleDelete = (id) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          dispatch({ type: 'DELETE_ASSET', payload: id });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Assets</Text>
      <FlatList
        data={state.assets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.assetItem}>
            <View>
              <Text style={styles.assetName}>{item.name}</Text>
              <Text>{item.category} | {item.status}</Text>
              <Text>
  {new Date(item.purchaseDate).toLocaleDateString()} → {new Date(item.warrantyDate).toLocaleDateString()}
</Text>

            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('EditAsset', { asset: item })}>
                <MaterialIcons name="edit" size={24} color="blue" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <MaterialIcons name="delete" size={24} color="red" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAsset')}>
  <MaterialIcons name="add-circle" size={24} color="#fff" style={{ marginRight: 8 }} />
  <Text style={styles.buttonText}>Add Asset</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4CAF50',
  paddingVertical: 12,
  borderRadius: 8,
  marginTop: 20,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
  assetName: { fontSize: 18, fontWeight: '600' },
  icon: { marginLeft: 10 },
});
