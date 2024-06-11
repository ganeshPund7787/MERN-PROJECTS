import { create } from "zustand"

const useConersation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set((selectedConversation)),
    messages: [],
    setMessages: (messages) => set((messages)),
}))

export default useConersation;