import create from 'zustand'
import axios from 'axios'

export const useTransactionsStore = create((set) => ({
  transactions: [],
  setTransactions: (txns) =>
    set((state) => ({
      ...state,
      txns,
    })),
  fetch: async () => {
    try {
      const { data, status } = await axios.get(
        'http://localhost:3000/transactions'
      )
      if (!data || status !== 200) {
        throw new Error('GET request failed')
      }

      set((state) => ({
        ...state,
        transactions: data,
      }))

      console.log('finished fetch')
    } catch (e) {
      console.error(e)
    }
  },
}))
