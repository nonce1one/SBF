import React, { useState, useRef } from 'react';
import Layout from '../compenents/Layout';
import Canvas from '../compenents/Canvas';
import Toolbar from '../compenents/Toolbar';

export default function DrawingBoard() {
  const [lineColor, setLineColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(10);
  const [dataUrl, setDataUrl] = useState('#');
  const [currentImageArray, setCurrentImageArray] = useState([]);
  const [undoCount, setUndoCount] = useState(0);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const undo = () => {
    if (undoCount > 1) {
      setUndoCount((undoCount) => undoCount - 1);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let canvasPic = new Image();
      canvasPic.src = currentImageArray[currentImageArray.length - 2];
      canvasPic.onload = function () {
        ctx.drawImage(canvasPic, 0, 0);
      };
      setCurrentImageArray(currentImageArray.slice(0, -1));
    }
  };

  const handleDownload = () => {
    setDataUrl(canvasRef.current.toDataURL('image/png'));
    let f = canvasRef.current.toDataURL('image/png');
    return f;
  };
  return (
    <Layout>
      <section className="paintapp">
        <Toolbar
          setLineColor={setLineColor}
          handleDownload={handleDownload}
          dataUrl={dataUrl}
          setLineWidth={setLineWidth}
          undoCount={undoCount}
          undo={undo}
          currentImage={currentImageArray}
        />
        <Canvas
          setUndoCount={setUndoCount}
          setCurrentImageArray={setCurrentImageArray}
          currentImageArray={currentImageArray}
          lineWidth={lineWidth}
          lineColor={lineColor}
          canvasRef={canvasRef}
          ctxRef={ctxRef}
        />
      </section>
    </Layout>
  );
}
