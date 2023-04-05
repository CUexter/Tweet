import { create } from "zustand";

interface useRegWindowState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegWindow = create<useRegWindowState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegWindow;
