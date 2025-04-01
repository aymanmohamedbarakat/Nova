import { create } from "zustand";

export const domain = "http://127.0.0.1:5000";

export const useSideHeader = create((set) => ({
  index: false,
  openSideHeader: () => set(() => ({ index: true })),
  closeSideHeader: () => set(() => ({ index: false })),
}));

export const useDetails = create((set) => ({
  isDetailsOpen: false,
  activeDetailsId: null,

  openDetails: (id) =>
    set({
      activeDetailsId: id,
      isDetailsOpen: true,
    }),

  closeDetails: () =>
    set({
      activeDetailsId: null,
      isDetailsOpen: false,
    }),

  setActiveDetailsId: (id) => set({ activeDetailsId: id }),

  resetActiveDetailsId: () => set({ activeDetailsId: null }),
}));
