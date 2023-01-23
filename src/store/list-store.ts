import produce from "immer";
import { create } from "zustand";

export interface ListStore {
  attendance: {
    listData: [];
    setListData: (data: []) => void;
    endpoint: string;
  };
  order: {
    listData: [];
    setListData: (data: []) => void;
    endpoint: string;
  };
  pending: {
    listData: [];
    setListData: (data: []) => void;
    endpoint: string;
  };
  visited: {
    listData: [];
    setListData: (data: []) => void;
    endpoint: string;
  };
  beneficiaries: {
    listData: [];
    setListData: (data: []) => void;
    endpoint: string;
  };
}

export const useListStore = create<ListStore>((set) => ({
  attendance: {
    listData: [],
    setListData: (data) => {
      set(
        produce<ListStore>((state) => {
          state.attendance.listData = data;
        })
      );
    },
    endpoint: "/beneficiary-list",
  },
  order: {
    listData: [],
    setListData: (data) => {
      set(
        produce<ListStore>((state) => {
          state.order.listData = data;
        })
      );
    },
    endpoint: "/order-list",
  },
  pending: {
    listData: [],
    setListData: (data) => {
      set(
        produce<ListStore>((state) => {
          state.pending.listData = data;
        })
      );
    },
    endpoint: "/pending-list",
  },
  visited: {
    listData: [],
    setListData: (data) => {
      set(
        produce<ListStore>((state) => {
          state.visited.listData = data;
        })
      );
    },
    endpoint: "/visited-list",
  },
  beneficiaries: {
    listData: [],
    setListData: (data) => {
      set(
        produce<ListStore>((state) => {
          state.beneficiaries.listData = data;
        })
      );
    },
    endpoint: "/beneficiary-list",
  },
}));
