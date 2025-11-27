import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Switch } from 'react-native-gesture-handler';

type Props = DrawerScreenProps<DrawerParamList, 'CreateHospedagem'>;

const CreateHospedagemScreen = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco_diaria, setPrecoDiaria] = useState('');
  const [disponivel, setDisponivel] = useState(true);

  const [categoria, setCategoria] = useState<number | null>(null);
  const [localizacao, setLocalizacao] = useState<number | null>(null);
  const [anfitriao, setAnfitriao] = useState<number | null>(null);

  const [categorias, setCategorias] = useState([]);
  const [localizacoes, setLocalizacoes] = useState([]);
  const [anfitrioes, setAnfitrioes] = useState([]);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome('');
      setDescricao('');
      setPrecoDiaria('');
      setDisponivel(true);
      fetch('http://localhost:8000/categorias/').then(r => r.json()).then(setCategorias);
      fetch('http://localhost:8000/localizacoes/').then(r => r.json()).then(setLocalizacoes);
      fetch('http://localhost:8000/anfitrioes/').then(r => r.json()).then(setAnfitrioes);
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/hospedagens/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, descricao, preco_diaria: Number(preco_diaria), disponivel, localizacao, categoria, anfitriao }),
    });
    navigation.navigate('Hospedagens');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova hospedagem</Text>
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
      <Text style={styles.label}>Preço da diária</Text>
      <TextInput 
        value={preco_diaria} 
        onChangeText={setPrecoDiaria} 
        style={styles.input} 
        keyboardType="numeric" 
      />
      <Text style={styles.label}>Disponível</Text>
      <Switch 
        value={disponivel} 
        onValueChange={setDisponivel} 
      />
      <Text style={styles.label}>Categoria</Text>
      <Picker 
        selectedValue={categoria} 
        onValueChange={setCategoria} 
        style={styles.input}>
        {categorias.map((c: any) => (
          <Picker.Item key={c.id} label={c.nome} value={c.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Localização</Text>
      <Picker 
        selectedValue={localizacao} 
        onValueChange={setLocalizacao} 
        style={styles.input}>
        {localizacoes.map((l: any) => (
          <Picker.Item 
            label={`${l.cidade} / ${l.estado} (${l.regiao})`} 
            value={l.id}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Anfitrião</Text>
      <Picker 
        selectedValue={anfitriao} 
        onValueChange={setAnfitriao} 
        style={styles.input}>
        {anfitrioes.map((a: any) => (
          <Picker.Item key={a.id} label={a.nome} value={a.id} />
        ))}
      </Picker>

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Hospedagens')} />
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

export default CreateHospedagemScreen;