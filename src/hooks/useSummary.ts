import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
// import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  /*useMemo serve para verificar se a variável deve ser recriada baseado apenas no array de dependências,
  caso o componente useSummary ou seus componentes pais sejam rerenderizado a variável não ocupará 
  outro espaço na memória, impedindo que componentes que dependam dela sejam rerenderizados também*/
  const summary = useMemo(() => {
    // reduce = reduz um array a algum outro dado esperado
    // {income: 0, outcome: 0, total: 0}
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])
  //no array de dependências vai apenas as variáveis externas ao useMemo

  return summary
}
