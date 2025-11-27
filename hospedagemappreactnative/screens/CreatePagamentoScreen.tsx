import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreatePagamento'>;

const CreatePagamentoScreen = ({ navigation }: Props) => {

  const [valor, setValor] = useState('');
  const [metodo_pagamento, setMetodoPagamento] = useState('');
  const [status_pagamento, setStatusPagamento] = useState('');
  const [data_pagamento, setDataPagamento] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setValor('');
      setMetodoPagamento('');
      setStatusPagamento('');
      setDataPagamento('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);

    const res = await fetch('http://localhost:8000/pagamentos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor: Number(valor), metodo_pagamento, status_pagamento, data_pagamento }),
    });

    navigation.navigate('Pagamentos');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Pagamento</Text>
      <Text style={styles.label}>Valor</Text>
      <TextInput
        value={valor}
        onChangeText={setValor}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Método</Text>
      <TextInput
        value={metodo_pagamento}
        onChangeText={setMetodoPagamento}
        style={styles.input}
      />
      <Text style={styles.label}>Status</Text>
      <TextInput
        value={status_pagamento}
        onChangeText={setStatusPagamento}
        style={styles.input}
      />
      <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
      <TextInput
        value={data_pagamento}
        onChangeText={setDataPagamento}
        style={styles.input}
      />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Pagamentos')} />
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
    alignSelf: 'center' },
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

export default CreatePagamentoScreen;