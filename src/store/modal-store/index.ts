import produce from "immer";
import create from "zustand";

export interface ModalStore {
  attendance: {
    isShow: boolean;
    attendeeData: any;
    show: (data: object) => void;
    hide: () => void;
    toggle: () => void;
  };
}

export const useModalStore = create<ModalStore>((set, get) => ({
  attendance: {
    isShow: false,
    attendeeData: {},
    show: (data) => {
      set(
        produce<ModalStore>((state) => {
          state.attendance.isShow = true;
          state.attendance.attendeeData = data;
        })
      );
    },
    hide: () => {
      set(
        produce<ModalStore>((state) => {
          state.attendance.isShow = false;
        })
      );
    },
    toggle: () => {
      set(
        produce<ModalStore>((state) => {
          state.attendance.isShow = !state.attendance.isShow;
        })
      );
    },
  },
}));
