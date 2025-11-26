import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateLocalizacao'>;

const CreateLocalizacaoScreen = ({ navigation }: Props) => {

  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const [regiao, setRegiao] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setCidade('');
      setEstado('');
      setPais('');
      setRegiao('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/localizacoes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cidade, estado, pais, regiao }),
    });
    navigation.navigate('Localizacoes');  
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Localização</Text>

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        value={estado}
        onChangeText={setEstado}
        style={styles.input}
      />

      <Text style={styles.label}>País</Text>
      <TextInput
        value={pais}
        onChangeText={setPais}
        style={styles.input}
      />

      <Text style={styles.label}>Região</Text>
      <TextInput
        value={regiao}
        onChangeText={setRegiao}
        style={styles.input}
      />

      {saving
        ? <ActivityIndicator size="large" color="#4B7BE5" />
        : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      }

      <Button title="Voltar" onPress={() => navigation.navigate('Localizacoes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 12, 
    alignSelf: 'center' 
  },
  label: { 
    fontWeight: '600', 
    marginTop: 12, 
    marginBottom: 4 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default CreateLocalizacaoScreen;