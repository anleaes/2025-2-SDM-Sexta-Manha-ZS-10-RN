import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native-gesture-handler';

type Props = DrawerScreenProps<DrawerParamList, 'EditAvaliacao'>;

export type Cliente = { id: number; nome: string };
export type Hospedagem = { id: number; nome: string };

const EditAvaliacaoScreen = ({ route, navigation }: Props) => {
  const { avaliacao } = route.params;

  const [nota, setNota] = useState(String(avaliacao.nota));
  const [comentario, setComentario] = useState(avaliacao.comentario);
  const [publicada, setPublicada] = useState(avaliacao.publicada);

  const [autor, setAutor] = useState<number>(avaliacao.autor);
  const [hospedagem, setHospedagem] = useState<number>(avaliacao.hospedagem);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cli = await fetch('http://localhost:8000/clientes/').then(r => r.json());
      const hos = await fetch('http://localhost:8000/hospedagens/').then(r => r.json());

      setClientes(cli);
      setHospedagens(hos);

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`http://localhost:8000/avaliacoes/${avaliacao.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota: Number(nota), comentario, publicada, autor, hospedagem }),
    });

    setSaving(false);
    navigation.navigate('Avaliacoes');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4B7BE5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Nota (1 a 5)</Text>
      <TextInput
        value={nota}
        onChangeText={setNota}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Comentário</Text>
      <TextInput
        value={comentario}
        onChangeText={setComentario}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <Text style={styles.label}>Publicada</Text>
      <Switch value={publicada} onValueChange={setPublicada} />

      <Text style={styles.label}>Autor</Text>
      <Picker
        selectedValue={autor}
        onValueChange={setAutor}
        style={styles.input}
      >
        {clientes.map(c => (
          <Picker.Item key={c.id} label={c.nome} value={c.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Hospedagem</Text>
      <Picker
        selectedValue={hospedagem}
        onValueChange={setHospedagem}
        style={styles.input}
      >
        {hospedagens.map(h => (
          <Picker.Item key={h.id} label={h.nome} value={h.id} />
        ))}
      </Picker>

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}


      <Button title="Voltar" onPress={() => navigation.navigate('Avaliacoes')} />

    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
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
    padding: 10
  },
});

export default EditAvaliacaoScreen;