import create from 'zustand'
import axios from 'axios'

export const useTransactionsStore = create((set, get) => ({
  allTransactions: [],
  lastDayTransactions: [],
  last3DayTransactions: [],
  last5DayTransactions: [],
  lastMonthsTransactions: [],
  transactionsById: new Map(),
  setTransactions: (txns) =>
    set((state) => ({
      ...state,
      txns,
    })),
  fetch: async () => {
    try {
      await get().fetchLastDay()
      await get().fetchLast3Days()
      await get().fetchLastMonth()
      await get().fetchAll()
    } catch (e) {
      console.error(e)
    }
  },
  fetchLastDay: async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_URL_DEV}/transactions?timeline=1`
      )

      if (!data || status !== 200) {
        throw new Error('GET request failed')
      }

      set((state) => ({
        ...state,
        lastDayTransactions: data,
      }))
    } catch (e) {
      console.error(e)
    }
  },
  fetchLast3Days: async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_URL_DEV}/transactions?timeline=3`
      )

      if (!data || status !== 200) {
        throw new Error('GET request failed')
      }

      set((state) => ({
        ...state,
        last3DayTransactions: data,
      }))
    } catch (e) {
      console.error(e)
    }
  },
  fetchLastMonth: async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_URL_DEV}/transactions?timeline=30`
      )

      if (!data || status !== 200) {
        throw new Error('GET request failed')
      }

      set((state) => ({
        ...state,
        lastMonthsTransactions: data,
      }))
    } catch (e) {
      console.error(e)
    }
  },
  fetchAll: async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_URL_DEV}/transactions`
      )

      if (!data || status !== 200) {
        throw new Error('GET request failed')
      }

      set((state) => ({
        ...state,
        allTransactions: data,
      }))

      const txnById = new Map()

      for (let i = 0; i < data.length; i++) {
        txnById.set(data[i].id, data[i])
      }

      set((state) => ({
        ...state,
        transactionsById: txnById,
      }))
    } catch (e) {
      console.error(e)
    }
  },
}))
