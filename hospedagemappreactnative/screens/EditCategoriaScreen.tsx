import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Switch } from 'react-native-gesture-handler';

type Props = DrawerScreenProps<DrawerParamList, 'EditCategoria'>;

const EditCategoriaScreen = ({ route, navigation }: Props) => {
  const { categoria } = route.params;
  const [nome, setNome] = useState(categoria.nome);
  const [descricao, setDescricao] = useState(categoria.descricao);
  const [ativo, setAtivo] = useState(categoria.ativo);
  const [limite_hospedes, setLimiteHospedes] = useState(String(categoria.limite_hospedes));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(categoria.nome);
    setDescricao(categoria.descricao);
    setAtivo(categoria.ativo);
    setLimiteHospedes(String(categoria.limite_hospedes));
  }, [categoria]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/categorias/${categoria.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao, ativo, limite_hospedes: Number(limite_hospedes) }),
      }
    );
    navigation.navigate('Categorias');        
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
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <Text style={styles.label}>Limite de hóspedes</Text>
      <TextInput
        value={limite_hospedes}
        onChangeText={setLimiteHospedes}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Ativo</Text>
      <Switch
        value={ativo}
        onValueChange={setAtivo}
      />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Categorias')} />
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

export default EditCategoriaScreen;