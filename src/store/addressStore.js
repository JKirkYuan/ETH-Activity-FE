import create from 'zustand'
import axios from 'axios'

export const useAddressStore = create((set, get) => ({
  addressHash: '',
  address: [],
  fetch: async (hash) => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_URL_PROD}/addresses?hash=${hash}`
      )

      if (!data || status !== 200) {
        throw new Error('GET request failed')
      }

      set((state) => ({
        ...state,
        address: data[0],
        addressHash: hash,
      }))
    } catch (e) {
      console.error(e)
    }
  },
}))
