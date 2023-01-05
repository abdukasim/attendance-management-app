import produce from "immer";
import create from "zustand";

import {
  ATTENDANCE_LIST_ENDPOINT,
  ORDER_LIST_ENDPOINT,
  PENDING_LIST_ENDPOINT,
  VISITED_LIST_ENDPOINT,
} from "@env";

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
    endpoint: ATTENDANCE_LIST_ENDPOINT,
  },
  order: {
    listData: [],
    setListData: (data) => {
      set(
        produce<ListStore>((state) => {
          state.order.listData = data.filter(
            (item: any) => item.active
          ) as never;
        })
      );
    },
    endpoint: ORDER_LIST_ENDPOINT,
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
    endpoint: PENDING_LIST_ENDPOINT,
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
    endpoint: VISITED_LIST_ENDPOINT,
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
    endpoint: ATTENDANCE_LIST_ENDPOINT,
  },
}));
