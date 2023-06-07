import { create } from 'zustand';

interface MarkdownState {
  markdown: string;
  setMarkdown: (value: string) => void;
  fileName: string;
  setFileName: (value: string) => void;
  dbFileName: string;
  setDbFileName: (value: string) => void;
  modalIsOpen: boolean;
  toggleModalIsOpen: () => void;
  saveFileNameMenuIsOpen: boolean;
  toggleSaveFileNameMenuIsOpen: () => void;
  textAreaIsOpen: boolean;
  toggleTextAreaIsOpen: () => void;
  menuIsOpen: boolean;
  toggleMenuIsOpen: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentFile: string;
  setCurrentFile: (value: string) => void;
}

export const useMarkdownStore = create<MarkdownState>((set) => ({
  markdown: '',
  setMarkdown: (value: string) => set(() => ({ markdown: value })),
  fileName: '',
  setFileName: (value: string) => set(() => ({ fileName: value })),
  dbFileName: '',
  setDbFileName: (value: string) => set(() => ({ dbFileName: value })),
  modalIsOpen: false,
  toggleModalIsOpen: () =>
    set((state) => ({ modalIsOpen: !state.modalIsOpen })),
  saveFileNameMenuIsOpen: false,
  toggleSaveFileNameMenuIsOpen: () => {
    set((state) => ({ saveFileNameMenuIsOpen: !state.saveFileNameMenuIsOpen }));
  },
  textAreaIsOpen: true,
  toggleTextAreaIsOpen: () =>
    set((state) => ({ textAreaIsOpen: !state.textAreaIsOpen })),
  menuIsOpen: false,
  toggleMenuIsOpen: () => set((state) => ({ menuIsOpen: !state.menuIsOpen })),
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => set(() => ({ isLoggedIn: value })),
  currentFile: '',
  setCurrentFile: (value: string) => set(() => ({ currentFile: value })),
}));
