import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditPagamento'>;

const EditPagamentoScreen = ({ route, navigation }: Props) => {
  const { pagamento } = route.params;

  const [valor, setValor] = useState(String(pagamento.valor));
  const [metodo_pagamento, setMetodoPagamento] = useState(pagamento.metodo_pagamento);
  const [status_pagamento, setStatusPagamento] = useState(pagamento.status_pagamento);
  const [data_pagamento, setDataPagamento] = useState(pagamento.data_pagamento);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValor(String(pagamento.valor));
    setMetodoPagamento(pagamento.metodo_pagamento);
    setStatusPagamento(pagamento.status_pagamento);
    setDataPagamento(pagamento.data_pagamento);
  }, [pagamento]);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`http://localhost:8000/pagamentos/${pagamento.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor: Number(valor), metodo_pagamento, status_pagamento, data_pagamento }),
    });

    navigation.navigate('Pagamentos');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.label}>Data (YYYY-MM-DD)</Text>
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
  label: { 
    fontWeight: 'bold', 
    marginTop: 12, 
    marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditPagamentoScreen;