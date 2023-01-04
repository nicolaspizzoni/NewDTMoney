import { useContextSelector } from 'use-context-selector'
// import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  // reduce = reduz um array a algum outro dado esperado
  // {income: 0, outcome: 0, total: 0}
  const summary = transactions.reduce(
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

  return summary
}
