import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { use, useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Switch } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

type Props = DrawerScreenProps<DrawerParamList, 'EditHospedagem'>;

const EditHospedagemScreen = ({ route, navigation }: Props) => {
  const { hospedagem } = route.params;

  const [nome, setNome] = useState(hospedagem.nome);
  const [descricao, setDescricao] = useState(hospedagem.descricao);
  const [preco_diaria, setPrecoDiaria] = useState(String(hospedagem.preco_diaria));
  const [disponivel, setDisponivel] = useState(hospedagem.disponivel);

  const [categoria, setCategoria] = useState(hospedagem.categoria);
  const [localizacao, setLocalizacao] = useState(hospedagem.localizacao);
  const [anfitriao, setAnfitriao] = useState(hospedagem.anfitriao);

  const [categoriasList, setCategoriasList] = useState<any[]>([]);
  const [localizacoesList, setLocalizacoesList] = useState<any[]>([]);
  const [anfitrioesList, setAnfitrioesList] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const [catRes, locRes, anfRes] = await Promise.all([
      fetch('http://localhost:8000/categorias/'),
      fetch('http://localhost:8000/localizacoes/'),
      fetch('http://localhost:8000/anfitrioes/'),
    ]);

    setCategoriasList(await catRes.json());
    setLocalizacoesList(await locRes.json());
    setAnfitrioesList(await anfRes.json());

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setNome(hospedagem.nome);
    setDescricao(hospedagem.descricao);
    setPrecoDiaria(String(hospedagem.preco_diaria));
    setDisponivel(hospedagem.disponivel);
    setCategoria(hospedagem.categoria);
    setLocalizacao(hospedagem.localizacao);
    setAnfitriao(hospedagem.anfitriao);
  }, [hospedagem]);

  const handleSave = async () => {
    setSaving(true);

    const res = await fetch(`http://localhost:8000/hospedagens/${hospedagem.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, descricao, preco_diaria: Number(preco_diaria), disponivel, localizacao, categoria, anfitriao }),
    });

    navigation.navigate('Hospedagens');
    setSaving(false);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

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
        >
        {categoriasList.map((c) => (
          <Picker.Item key={c.id} label={c.nome} value={c.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Localização</Text>
      <Picker 
        selectedValue={localizacao} 
        onValueChange={setLocalizacao} 
        >
        {localizacoesList.map((l) => (
          <Picker.Item 
            key={l.id}
            label={`${l.cidade} / ${l.estado} (${l.regiao})`}
            value={l.id}
          />
        ))}
      </Picker>
      <Text style={styles.label}>Anfitrião</Text>
      <Picker 
        selectedValue={anfitriao} 
        onValueChange={setAnfitriao} 
        >
        {anfitrioesList.map((a) => (
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

export default EditHospedagemScreen;