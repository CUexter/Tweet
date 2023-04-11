import { create } from "zustand";

interface adminCreateState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const adminCreate = create<adminCreateState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default adminCreate;
