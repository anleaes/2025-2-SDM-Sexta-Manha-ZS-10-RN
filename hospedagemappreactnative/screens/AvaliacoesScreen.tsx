import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Avaliacoes'>;

export type Avaliacao = {
  id: number;
  nota: number;
  comentario: string;
  data_avaliacao: string;
  publicada: boolean;
  autor: number;
  hospedagem: number;
};

const AvaliacoesScreen = ({ navigation }: Props) => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAvaliacoes = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/avaliacoes/');
    const data = await response.json();
    setAvaliacoes(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAvaliacoes();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/avaliacoes/${id}/`, { 
        method: 'DELETE', 
    });
    setAvaliacoes(prev => prev.filter(a => a.id !== id));
  };

  const renderItem = ({ item }: { item: Avaliacao }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Nota: {item.nota}/5</Text>
      <Text style={styles.description}>{item.comentario}</Text>
      <Text style={styles.description}>Data: {item.data_avaliacao}</Text>
      <Text style={styles.description}>Publicada: {item.publicada ? 'Sim' : 'Não'}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditAvaliacao', { avaliacao: item })}
      >
      <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
      <Text style={styles.editText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliações</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={avaliacoes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateAvaliacao')}
      >
      <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: { 
    color: '#fff', 
    fontWeight: '500' 
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: { 
    flexDirection: 'row', 
    marginTop: 8, 
    alignSelf: 'flex-end' 
  },
});

export default AvaliacoesScreen;