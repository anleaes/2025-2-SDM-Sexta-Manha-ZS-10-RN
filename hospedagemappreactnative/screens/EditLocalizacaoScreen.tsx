import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditLocalizacao'>;

const EditLocalizacaoScreen = ({ route, navigation }: Props) => {
  const { localizacao } = route.params;

  const [cidade, setCidade] = useState(localizacao.cidade);
  const [estado, setEstado] = useState(localizacao.estado);
  const [pais, setPais] = useState(localizacao.pais);
  const [regiao, setRegiao] = useState(localizacao.regiao);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCidade(localizacao.cidade);
    setEstado(localizacao.estado);
    setPais(localizacao.pais);
    setRegiao(localizacao.regiao);
  }, [localizacao]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/localizacoes/${localizacao.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cidade, estado, pais, regiao }),
      }
    );
    navigation.navigate('Localizacoes');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>

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

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

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
  label: { 
    fontWeight: 'bold', 
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

export default EditLocalizacaoScreen;