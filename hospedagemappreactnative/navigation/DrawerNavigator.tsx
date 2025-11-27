import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';

import CategoriasScreen, { Categoria } from '../screens/CategoriasScreen';
import CreateCategoriaScreen from '@/screens/CreateCategoriaScreen';
import EditCategoriaScreen from '@/screens/EditCategoriaScreen';

import LocalizacoesScreen, { Localizacao } from '@/screens/LocalizacoesScreen';
import CreateLocalizacaoScreen from '@/screens/CreateLocalizacaoScreen';
import EditLocalizacaoScreen from '@/screens/EditLocalizacaoScreen';

import AnfitrioesScreen, { Anfitriao } from '@/screens/AnfitrioesScreen';
import CreateAnfitriaoScreen from '@/screens/CreateAnfitriaoScreen';
import EditAnfitriaoScreen from '@/screens/EditAnfitriaoScreen';

import PagamentosScreen, { Pagamento } from '@/screens/PagamentosScreen';
import CreatePagamentoScreen from '@/screens/CreatePagamentoScreen';
import EditPagamentoScreen from '@/screens/EditPagamentoScreen';

import ClientesScreen, { Cliente } from '@/screens/ClientesScreen';
import CreateClienteScreen from '@/screens/CreateClienteScreen';
import EditClienteScreen from '@/screens/EditClienteScreen';

import HospedagensScreen, { Hospedagem } from '@/screens/HospedagensScreen';
import CreateHospedagemScreen from '@/screens/CreateHospedagemScreen';


export type DrawerParamList = {
  Home: undefined;

  Categorias: undefined;
  CreateCategoria: undefined; 
  EditCategoria: { categoria: Categoria };

  Localizacoes: undefined;
  CreateLocalizacao: undefined;
  EditLocalizacao: { localizacao: Localizacao };

  Anfitrioes: undefined;
  CreateAnfitriao: undefined;
  EditAnfitriao: { anfitriao: Anfitriao };

  Pagamentos: undefined;
  CreatePagamento: undefined;
  EditPagamento: { pagamento: Pagamento };

  Clientes: undefined;
  CreateCliente: undefined;
  EditCliente: { cliente: Cliente };

  Hospedagens: undefined;
  CreateHospedagem: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Categorias"
        component={CategoriasScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="apps-sharp" size={size} color={color} />,
          title: 'Categorias',
        }}
      />
      <Drawer.Screen
        name="CreateCategoria"
        component={CreateCategoriaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova categoria' }}
      />
      <Drawer.Screen
        name="EditCategoria"
        component={EditCategoriaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar categoria' }}
      />
      <Drawer.Screen
        name="Localizacoes"
        component={LocalizacoesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="location-outline" size={size} color={color} />,
          title: 'Localizações',
        }}
      />
      <Drawer.Screen
        name="CreateLocalizacao"
        component={CreateLocalizacaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova localização' }}
      />
      <Drawer.Screen
        name="EditLocalizacao"
        component={EditLocalizacaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar localização' }}
      />
      <Drawer.Screen
        name="Anfitrioes"
        component={AnfitrioesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          title: 'Anfitriões',
        }}
      />
      <Drawer.Screen
        name="CreateAnfitriao"
        component={CreateAnfitriaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo anfitrião' }}
      />
      <Drawer.Screen
        name="EditAnfitriao"
        component={EditAnfitriaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar anfitrião' }}
      />
      <Drawer.Screen
        name="Pagamentos"
        component={PagamentosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="card-outline" size={size} color={color} />,
          title: 'Pagamentos',
        }}
      />
      <Drawer.Screen
        name="CreatePagamento"
        component={CreatePagamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo pagamento' }}
      />
      <Drawer.Screen
        name="EditPagamento"
        component={EditPagamentoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar pagamento' }}
      />
      <Drawer.Screen
        name="Clientes"
        component={ClientesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color}  />,
          title: 'Clientes',
        }}
      />
      <Drawer.Screen
        name="CreateCliente"
        component={CreateClienteScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo cliente' }}
      />
      <Drawer.Screen
        name="EditCliente"
        component={EditClienteScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar cliente' }}
      />
      <Drawer.Screen
        name="Hospedagens"
        component={HospedagensScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="bed-outline" size={size} color={color}  />,
          title: 'Hospedagens',
        }}
      />
      <Drawer.Screen
        name="CreateHospedagem"
        component={CreateHospedagemScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova hospedagem' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;