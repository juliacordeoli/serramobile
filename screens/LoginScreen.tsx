import React, { useState } from 'react';
import { View, TextInput, Button, CheckBox, Text, StyleSheet, AsyncStorage } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    // Simular verificação de login
    if (login === 'user' && password === 'pass') {
      if (rememberMe) {
        await AsyncStorage.setItem('login', login);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('login');
        await AsyncStorage.removeItem('password');
      }
      navigation.navigate('Home');
    } else {
      alert('Login inválido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <Button title={showPassword ? 'Ocultar Senha' : 'Mostrar Senha'} onPress={() => setShowPassword(!showPassword)} />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text>Gravar Senha</Text>
      </View>
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar-se" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 }
});
