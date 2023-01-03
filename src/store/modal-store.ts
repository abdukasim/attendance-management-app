import produce from "immer";
import create from "zustand";
import { BeneficiaryModel } from "../models/beneficiary-models";
import { PendingUserModel } from "../models/pending-models";
import { VisitedUserModel } from "../models/visited-models";

export interface ModalStore {
  delete: {
    isShow: boolean;
    show: () => void;
    hide: () => void;
  };
  attendance: {
    isShow: boolean;
    attendeeData: BeneficiaryModel;
    show: (data: BeneficiaryModel) => void;
    hide: () => void;
    toggle: () => void;
  };
  order: {
    isShow: boolean;
    orderData: any;
    show: (data: object) => void;
    hide: () => void;
    toggle: () => void;
  };
  pending: {
    isShow: boolean;
    pendingData: PendingUserModel;
    show: (data: PendingUserModel) => void;
    hide: () => void;
    toggle: () => void;
  };
  visited: {
    isShow: boolean;
    visitedData: VisitedUserModel;
    show: (data: VisitedUserModel) => void;
    hide: () => void;
    toggle: () => void;
  };
  beneficiaries: {
    isShow: boolean;
    beneficiariesData: BeneficiaryModel;
    show: (data: BeneficiaryModel) => void;
    hide: () => void;
    toggle: () => void;
  };
}

export const useModalStore = create<ModalStore>((set, get) => ({
  delete: {
    isShow: false,
    show: () => {
      set(
        produce<ModalStore>((state) => {
          state.delete.isShow = true;
        })
      );
    },
    hide: () => {
      set(
        produce<ModalStore>((state) => {
          state.delete.isShow = false;
        })
      );
    },
  },
  attendance: {
    isShow: false,
    attendeeData: <BeneficiaryModel>{},
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
  order: {
    isShow: false,
    orderData: {},
    show: (data) => {
      set(
        produce<ModalStore>((state) => {
          state.order.isShow = true;
          state.order.orderData = data;
        })
      );
    },
    hide: () => {
      set(
        produce<ModalStore>((state) => {
          state.order.isShow = false;
        })
      );
    },
    toggle: () => {
      set(
        produce<ModalStore>((state) => {
          state.order.isShow = !state.order.isShow;
        })
      );
    },
  },
  pending: {
    isShow: false,
    pendingData: <PendingUserModel>{},
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
    visitedData: <VisitedUserModel>{},
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
    beneficiariesData: <BeneficiaryModel>{},
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
