import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditAnfitriao'>;

const EditAnfitriaoScreen = ({ route, navigation }: Props) => {
  const { anfitriao } = route.params;

  const [nome, setNome] = useState(anfitriao.nome);
  const [email, setEmail] = useState(anfitriao.email);
  const [telefone, setTelefone] = useState(anfitriao.telefone);
  const [avaliacao_media, setAvaliacaoMedia] = useState(String(anfitriao.avaliacao_media));

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(anfitriao.nome);
    setEmail(anfitriao.email);
    setTelefone(anfitriao.telefone);
    setAvaliacaoMedia(String(anfitriao.avaliacao_media));
  }, [anfitriao]);

  const handleSave = async () => {
    setSaving(true);

    const res = await fetch(`http://localhost:8000/anfitrioes/${anfitriao.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone, avaliacao_media: Number(avaliacao_media) }),
    });

    navigation.navigate('Anfitrioes');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput 
      value={nome} 
      onChangeText={setNome} 
      style={styles.input} 
      />
      <Text style={styles.label}>Email</Text>
      <TextInput 
      value={email} 
      onChangeText={setEmail} 
      style={styles.input} 
      />
      <Text style={styles.label}>Telefone</Text>
      <TextInput 
      value={telefone} 
      onChangeText={setTelefone} 
      style={styles.input} 
      />
      <Text style={styles.label}>Avaliação Média</Text>
      <TextInput
        value={avaliacao_media}
        onChangeText={setAvaliacaoMedia}
        style={styles.input}
        keyboardType="numeric"
      />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Anfitrioes')} />
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

export default EditAnfitriaoScreen;