// src/stores/uiStore.js
import create from "zustand";

export const useUIStore = create((set) => ({
  playing: true,
  speed: 1.0, // 1 = normal. >1 faster, <1 slower
  focusWeight: 0.7, // 0..1 (focus vs trending)
  currentIndex: 0,
  setPlaying: (v) => set({ playing: v }),
  togglePlaying: () => set((s) => ({ playing: !s.playing })),
  setSpeed: (s) => set({ speed: s }),
  setFocusWeight: (w) => set({ focusWeight: w }),
  setCurrentIndex: (i) => set({ currentIndex: i }),
}));
