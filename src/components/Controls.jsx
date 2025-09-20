// src/components/Controls.jsx
import React from "react";
import { useUIStore } from "../stores/uiStore";

export default  Controls = () => {
  const { playing, togglePlaying, speed, setSpeed, focusWeight, setFocusWeight } = useUIStore();

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl controls-blur">
      <button
        onClick={togglePlaying}
        className="px-3 py-2 rounded-md bg-white/6 hover:bg-white/10"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? "Pause" : "Play"}
      </button>

      <div className="flex items-center gap-2">
        <label className="text-xs">Speed</label>
        <input
          type="range"
          min="0.4"
          max="2.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs">Focus ↔ Trending</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={focusWeight}
          onChange={(e) => setFocusWeight(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
