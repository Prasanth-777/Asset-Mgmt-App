import { MaterialIcons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddCategory')}>
        <MaterialIcons name="add-circle-outline" size={24} color="#333" />
        <Text style={styles.optionText}>Add Category</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddStatus')}>
        <MaterialIcons name="add-circle-outline" size={24} color="#333" />
        <Text style={styles.optionText}>Add Status</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#333',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53935',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
});
