import { create } from 'zustand';

interface MarkdownState {
  markdown: string;
  setMarkdown: (value: string) => void;
  fileName: string;
  setFileName: (value: string) => void;
  modalIsOpen: boolean;
  toggleModalIsOpen: () => void;
  textAreaIsOpen: boolean;
  toggleTextAreaIsOpen: () => void;
}

export const useMarkdownStore = create<MarkdownState>((set) => ({
  markdown: '',
  setMarkdown: (value: string) => set(() => ({ markdown: value })),
  fileName: '',
  setFileName: (value: string) => set(() => ({ fileName: value })),
  modalIsOpen: false,
  toggleModalIsOpen: () =>
    set((state) => ({ modalIsOpen: !state.modalIsOpen })),
  textAreaIsOpen: true,
  toggleTextAreaIsOpen: () =>
    set((state) => ({ textAreaIsOpen: !state.textAreaIsOpen })),
}));
