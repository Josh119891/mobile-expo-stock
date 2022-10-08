import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  red: {
    zIndex: -1,
    position: 'relative',
    backgroundColor: '#ff314c',
    height: '40%',
    width: '100%',
  },
  inner: {
    zIndex: 1,
    flex: 1,
    padding: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center', // 水平居中
    justifyContent: 'flex-start', // 垂直居中
  },
  title: {
    fontSize: 50,
    color: 'white',
    marginTop: 20,
  },
  inputBox: {
    borderColor: 'grey',
    padding: 30,
    marginTop: 120,
    width: '80%',
    alignItems: 'center', // 水平居中
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 20,
    borderWidth: 0.5,
  },
  phone: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
    width: '90%',
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  helperBox: {
    marginTop: 60,
  },
  helperTitle: { fontSize: 15, color: 'grey', marginBottom: 20 },
  submitBtn: {
    backgroundColor: '#ff314c',
    margin: 6,
    padding: 10,
    marginTop: 50,
    width: '80%',
    borderRadius: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 20,
  },
});

export const authOptions = {
  title: '',
  headerStyle: { backgroundColor: '#ff314c' },
  headerShadowVisible: false,
  headerLeft: () => (
    <View style={{ marginLeft: 10 }}>
      <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
        <FontAwesome5 name="align-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  ),
  headerRight: () => (
    <View style={{ marginRight: 10 }}>
      <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
        <Fontisto name="bell" size={24} color="white" />
      </TouchableOpacity>
    </View>
  ),
};
