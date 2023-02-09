import { memo } from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionContext'

const schemaSearchForm = z.object({
  query: z.string(),
})

type SearchFormType = z.infer<typeof schemaSearchForm>

/*
  * Por que um componente renderiza?
  * - Hooks changed (mudou estado, context, reducer)
  * - Props changed (propriedade mudou)
  * - Parent rerender (componente pai renderizou)
  * 
  * Qual o fluxo de renderização?
  * 1. O React recria o HTML da interface daquele componente;
  * 2. Comparada a versão HTML recriada com a anterior;
  * 3. SE mudou algo, ele reescreve o HTML na tela.
  * 
  * Memo: Adiciona etapas anteriores ao fluxo de renderização, ao invés de comparar o html compara hooks e props (deep comparison)
  * 0: Hooks changed, Props changed (deep comparison);
  * 0.1: Compara a versão anterior dos hooks e props;
  * 0.2: SE mudou algo ele permite o fluxo de renderização, senão não haverá fluxo de renderização para o componente
*/

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormType>({
    resolver: zodResolver(schemaSearchForm),
  })

  async function handleSearchTransactions(data: SearchFormType) {
    // simulando uma requisição a API para ter um delay de 2s, criando uma promise e aguardando 2s
    // await new Promise(resolve => setTimeout(resolve, 2000))

    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
