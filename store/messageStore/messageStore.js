import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  message: null,
  topbarMessage: null,
  setMessage: (message) =>
    set(() => {
      return { message: message }
    }),
  setTemporaryMessage: (message) => {
    set(() => ({ message: message }))
    setTimeout(() => set(() => ({ message: null })), 5000)
  },
  setTopbarMessage: (message) => set(() => ({ topbarMessage: message }))
}))
