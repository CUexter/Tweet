import { create } from "zustand";

interface adminListState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const adminList = create<adminListState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default adminList;
