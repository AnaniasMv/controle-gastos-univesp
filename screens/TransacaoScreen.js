import React, { useState } from 'react';
import { supabase } from '../supabase';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { useTransactions } from '../contexts/TransactionsContext';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TransacaoScreen({ navigation }) {
  const { salvarTransacao } = useTransactions(); // usamos salvarTransacao agora
  
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');
  const [categoria, setCategoria] = useState('Pagamento Mensal');
  const [data, setData] = useState(new Date()); // Inicializa com a data atual
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla a visibilidade do DateTimePicker

  const handleAddTransaction = () => {
    if (descricao && valor && tipo && categoria && data) {
      salvarTransacao({
        descricao,
        valor: parseFloat(valor),
        tipo,
        data: data.toISOString(), // Envia a data no formato ISO
        categoria,
      });
      navigation.goBack();
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const categoriasDisponiveis = tipo === 'receita'
    ? [
        { label: 'Pagamento Mensal', value: 'Pagamento Mensal' },
        { label: 'Renda Extra', value: 'Renda Extra' },
      ]
    : [
        { label: 'Alimentação', value: 'Alimentação' },
        { label: 'Transporte', value: 'Transporte' },
        { label: 'Lazer', value: 'Lazer' },
        { label: 'Saúde', value: 'Saúde' },
      ];

  // Função para manipular a mudança de data
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(false); // Fecha o DateTimePicker após selecionar a data
    setData(currentDate); // Atualiza o estado com a data escolhida
  };

  // Função para abrir o DateTimePicker
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicionar Transação</Text>

      <Text>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Jantar"
      />

      <Text>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 50.00"
        keyboardType="numeric"
      />

      <Text>Tipo</Text>
      <Picker
        selectedValue={tipo}
        style={styles.input}
        onValueChange={(itemValue) => {
          setTipo(itemValue);
          setCategoria(itemValue === 'receita' ? 'Pagamento Mensal' : 'Alimentação');
        }}
      >
        <Picker.Item label="Receita" value="receita" />
        <Picker.Item label="Despesa" value="despesa" />
      </Picker>

      <Text>Categoria</Text>
      <Picker
        selectedValue={categoria}
        style={styles.input}
        onValueChange={(itemValue) => setCategoria(itemValue)}
      >
        {categoriasDisponiveis.map((cat) => (
          <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Picker>

      <Button title="Escolher Data" color='black' onPress={showDatePickerModal} />

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Button title="Adicionar Transação" onPress={handleAddTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },

});
