import { create } from "zustand";

interface loginWindowState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const loginWindow = create<loginWindowState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default loginWindowState;
