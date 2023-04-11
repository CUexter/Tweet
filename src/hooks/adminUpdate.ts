import { create } from "zustand";

interface adminUpdateState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const adminUpdate = create<adminUpdateState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default adminUpdate;
