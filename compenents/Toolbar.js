import React from 'react';
import styles from '../styles/Toolbar.module.css';

export default function Toolbar({
  handleDownload,
  dataUrl,
  undoCount,
  undo,
  currentImage,
  setLineColor,
  setLineWidth,
}) {
  const handleColorChange = (color) => {
    setLineColor(color);
  };

  const handleLineWidth = (width) => {
    setLineWidth(width);
  };

  return (
    <div className={styles.menu}>
      <label>Brush Color </label>
      <input type="color" onChange={(e) => handleColorChange(e.target.value)} />

      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="50"
        defaultValue="10"
        onChange={(e) => handleLineWidth(e.target.value)}
      />
      <button disabled={undoCount === 1} className="btn" onClick={undo}>
        Undo
      </button>
    </div>
  );
}
