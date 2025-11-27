import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native-gesture-handler';

type Props = DrawerScreenProps<DrawerParamList, 'CreateAvaliacao'>;

export type Cliente = { id: number; nome: string; };
export type Hospedagem = { id: number; nome: string; };

const CreateAvaliacaoScreen = ({ navigation }: Props) => {
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');
  const [publicada, setPublicada] = useState(false);

  const [autor, setAutor] = useState<number | null>(null);
  const [hospedagem, setHospedagem] = useState<number | null>(null);

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const cli = await fetch('http://localhost:8000/clientes/').then(r => r.json());
        const hos = await fetch('http://localhost:8000/hospedagens/').then(r => r.json());

        setClientes(cli);
        setHospedagens(hos);

        if (cli.length > 0) setAutor(cli[0].id);
        if (hos.length > 0) setHospedagem(hos[0].id);

        setLoading(false);
      };

      fetchData();
    }, [])
  );

  const handleSave = async () => {
    if (!autor || !hospedagem) return;

    setSaving(true);
    const res = await fetch('http://localhost:8000/avaliacoes/', {
      method: 'POST',
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
      <Text style={styles.title}>Nova Avaliação</Text>
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
      <Picker selectedValue={autor} onValueChange={setAutor} style={styles.input}>
        {clientes.map(c => (
          <Picker.Item key={c.id} label={c.nome} value={c.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Hospedagem</Text>
      <Picker selectedValue={hospedagem} onValueChange={setHospedagem} style={styles.input}>
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
    padding: 10 
  },
});

export default CreateAvaliacaoScreen;