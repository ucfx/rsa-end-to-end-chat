import { create } from "zustand";

const useConversationsStore = create((set) => ({
  conversations: {},
  selectedConversation: null,
  messages: {},
  setSelectedConversation: (socketId) => {
    set({ selectedConversation: socketId });
  },
  setConversations: (conversations) => {
    set({ conversations });
  },
  pushMessage: (socketId, message) => {
    console.log("pushMessage", socketId, message);
    set((state) => ({
      messages: {
        ...state.messages,
        [socketId]: [...(state.messages[socketId] || []), message],
      },
    }));
  },
}));

export default useConversationsStore;
