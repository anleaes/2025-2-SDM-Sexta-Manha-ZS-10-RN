import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateReserva'>;

type Pagamento = {
  id: number;
  valor: number;
  metodo_pagamento: string;
  status_pagamento: string;
  data_pagamento: string;
};

type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  data_cadastro: string;
};

type Hospedagem = {
  id: number;
  nome: string;
  descricao: string;
  preco_diaria: number;
  disponivel: boolean;
  localizacao: number;
  categoria: number;
  anfitriao: number;
};

const CreateReservaScreen = ({ navigation }: Props) => {
  const [dataCheckin, setDataCheckin] = useState('');
  const [dataCheckout, setDataCheckout] = useState('');
  const [quantidadeHospedes, setQuantidadeHospedes] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const [cliente, setCliente] = useState<number | null>(null);
  const [hospedagem, setHospedagem] = useState<number | null>(null);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([]);
  const [pagamentosSelecionados, setPagamentosSelecionados] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [pagRes, cliRes, hospRes] = await Promise.all([
      fetch('http://localhost:8000/pagamentos/'),
      fetch('http://localhost:8000/clientes/'),
      fetch('http://localhost:8000/hospedagens/'),
    ]);

    const pagamentosData = await pagRes.json();
    const clientesData = await cliRes.json();
    const hospedagensData = await hospRes.json();

    setPagamentos(pagamentosData);
    setClientes(clientesData);
    setHospedagens(hospedagensData);

    if (clientesData.length > 0) setCliente(clientesData[0].id);
    if (hospedagensData.length > 0) setHospedagem(hospedagensData[0].id);

    setPagamentosSelecionados([]);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setDataCheckin('');
      setDataCheckout('');
      setQuantidadeHospedes('');
      setValorTotal('');
      fetchData();
    }, [])
  );

  const togglePagamento = (id: number) => {
    setPagamentosSelecionados(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/reservas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data_checkin: dataCheckin, data_checkout: dataCheckout, quantidade_hospedes: Number(quantidadeHospedes), valor_total: Number(valorTotal), cliente, hospedagem, pagamento: pagamentosSelecionados }),
    });
    navigation.navigate('Reservas');
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nova reserva</Text>

      <Text style={styles.label}>Data de Check-in (AAAA-MM-DD)</Text>
      <TextInput
        value={dataCheckin}
        onChangeText={setDataCheckin}
        style={styles.input}
      />

      <Text style={styles.label}>Data de Check-out (AAAA-MM-DD)</Text>
      <TextInput
        value={dataCheckout}
        onChangeText={setDataCheckout}
        style={styles.input}
      />

      <Text style={styles.label}>Quantidade de hóspedes</Text>
      <TextInput
        value={quantidadeHospedes}
        onChangeText={setQuantidadeHospedes}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Valor total</Text>
      <TextInput
        value={valorTotal}
        onChangeText={setValorTotal}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cliente</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={cliente}
          onValueChange={itemValue => setCliente(itemValue)}
        >
          {clientes.map(c => (
            <Picker.Item key={c.id} label={c.nome} value={c.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Hospedagem</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={hospedagem}
          onValueChange={itemValue => setHospedagem(itemValue)}
        >
          {hospedagens.map(h => (
            <Picker.Item key={h.id} label={h.nome} value={h.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Pagamentos</Text>
      {pagamentos.map(p => {
        const selected = pagamentosSelecionados.includes(p.id);
        return (
          <TouchableOpacity
            key={p.id}
            style={[styles.checkbox, selected && styles.checkboxSelected]}
            onPress={() => togglePagamento(p.id)}
          >
            <Text style={styles.checkboxText}>
              {p.metodo_pagamento} - R$ {p.valor}
            </Text>
          </TouchableOpacity>
        );
      })}

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Reservas')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  checkboxSelected: {
    backgroundColor: '#4B7BE5',
    borderColor: '#4B7BE5',
  },
  checkboxText: {
    color: '#000',
  },
});


export default CreateReservaScreen;