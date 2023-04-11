import { create } from "zustand";

interface adminDeleteState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const adminDelete = create<adminDeleteState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default adminDelete;
