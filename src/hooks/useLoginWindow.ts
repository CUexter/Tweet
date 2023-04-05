import { create } from "zustand";

interface useLoginWindowState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginWindow = create<useLoginWindowState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginWindow;
