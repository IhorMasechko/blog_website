import { create } from "zustand";

type User = {
  id: string | undefined;
  email: string | undefined;
};

type State = {
  user: User;
  setUser: (payload: User) => void;
};

const useStore = create<State>((set) => ({
  user: { id: "", email: "" },

  setUser: (payload) => set({ user: payload }),
}));

export default useStore;
