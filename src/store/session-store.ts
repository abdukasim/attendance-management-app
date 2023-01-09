import produce from "immer";
import create from "zustand";
import { LoginResponse } from "../models/session-models";

interface SessionStore {
  authUser: LoginResponse | null;
  setAuthUser: (user: LoginResponse) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  authUser: null,
  setAuthUser: (user) => {
    set(
      produce<SessionStore>((state) => {
        state.authUser = user;
      })
    );
  },
}));
