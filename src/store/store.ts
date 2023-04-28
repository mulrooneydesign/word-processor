import { create } from 'zustand';

export const useMarkdownStore = create((set) => ({
  markdown: '',
  setMarkdown: (value: string) => set(() => ({ markdown: value })),
  fileName: '',
  setFileName: (value: string) => set(() => ({ fileName: value })),
  modalIsOpen: false,
  setModalIsOpen: (value: boolean) => set(() => ({ modalIsOpen: value })),
}));
