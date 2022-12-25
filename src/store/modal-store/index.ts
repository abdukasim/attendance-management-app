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
  pending: {
    isShow: boolean;
    pendingData: any;
    show: (data: object) => void;
    hide: () => void;
    toggle: () => void;
  };
  visited: {
    isShow: boolean;
    visitedData: any;
    show: (data: object) => void;
    hide: () => void;
    toggle: () => void;
  };
  beneficiaries: {
    isShow: boolean;
    beneficiariesData: any;
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
  pending: {
    isShow: false,
    pendingData: {},
    show: (data) => {
      set(
        produce<ModalStore>((state) => {
          state.pending.isShow = true;
          state.pending.pendingData = data;
        })
      );
    },
    hide: () => {
      set(
        produce<ModalStore>((state) => {
          state.pending.isShow = false;
        })
      );
    },
    toggle: () => {
      set(
        produce<ModalStore>((state) => {
          state.pending.isShow = !state.pending.isShow;
        })
      );
    },
  },
  visited: {
    isShow: false,
    visitedData: {},
    show: (data) => {
      set(
        produce<ModalStore>((state) => {
          state.visited.isShow = true;
          state.visited.visitedData = data;
        })
      );
    },
    hide: () => {
      set(
        produce<ModalStore>((state) => {
          state.visited.isShow = false;
        })
      );
    },
    toggle: () => {
      set(
        produce<ModalStore>((state) => {
          state.visited.isShow = !state.visited.isShow;
        })
      );
    },
  },
  beneficiaries: {
    isShow: false,
    beneficiariesData: {},
    show: (data) => {
      set(
        produce<ModalStore>((state) => {
          state.beneficiaries.isShow = true;
          state.beneficiaries.beneficiariesData = data;
        })
      );
    },
    hide: () => {
      set(
        produce<ModalStore>((state) => {
          state.beneficiaries.isShow = false;
        })
      );
    },
    toggle: () => {
      set(
        produce<ModalStore>((state) => {
          state.beneficiaries.isShow = !state.beneficiaries.isShow;
        })
      );
    },
  },
}));
