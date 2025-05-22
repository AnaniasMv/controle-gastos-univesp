import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../supabase'

// Criação do contexto de transações
const TransactionsContext = createContext()

// Provedor que envolve o app e fornece os dados
export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([])

  // Adiciona uma nova transação ao estado local
  function addTransaction(transaction) {
    setTransactions((prev) => [...prev, transaction])
  }

  // Salva nova transação no Supabase e atualiza o estado
  async function salvarTransacao(novaTransacao) {
    console.log('Tentando salvar transação:', novaTransacao)

    const { data, error } = await supabase
      .from('transacoes')
      .insert([novaTransacao]) // Supabase espera um array

    if (error || !data || data.length === 0) {
      console.error('Erro ao salvar transação:', error.message);
      return;
    }



    console.log('Transação salva com sucesso:', data[0])
    // Adiciona ao estado local
    setTransactions((prev) => [...prev, data[0]])
  }

  // Busca transações do Supabase ao iniciar o app
  useEffect(() => {
    async function fetchData() {
      const dados = await listarTransacoes()
      console.log('Transações do Supabase:', dados)
      setTransactions(dados)
    }

    fetchData()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, salvarTransacao }}>
      {children}
    </TransactionsContext.Provider>
  )
}

// Função para buscar transações no Supabase
async function listarTransacoes() {
  const { data, error } = await supabase
    .from('transacoes')
    .select('*')

  if (error) {
    console.error('Erro ao buscar transações:', error)
    return []
  }

  return data || [] // <-- garante que nunca retorna null
}

// Hook customizado para usar o contexto
export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionsProvider')
  }
  return context
}
