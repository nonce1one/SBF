import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Layout from './Layout';
import styles from '../styles/Canvas.module.css';

export default function Canvas({
  setUndoCount,
  setCurrentImageArray,
  currentImageArray,
  lineColor,
  lineWidth,
  canvasRef,
  ctxRef,
}) {
  const [bkgrdColor, setBkgrdColor] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 860, 860);
    const image = new Image();
    image.src = '/background.png';
    console.log(image.src);
    image.onload = () => {
      ctx.drawImage(image, 0, 0, 860, 860);
      setUndoCount((undoCount) => undoCount + 1);
      setCurrentImageArray((currentImageArray) => [
        ...currentImageArray,
        canvasRef.current.toDataURL('image/png'),
      ]);
    };
  }, []);

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    setUndoCount((undoCount) => undoCount + 1);
    setCurrentImageArray((currentImageArray) => [
      ...currentImageArray,
      canvasRef.current.toDataURL('image/png'),
    ]);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const widthHalf = lineWidth ? lineWidth / 2 : 0;
  const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${lineWidth}" viewBox="0 0 ${lineWidth} ${lineWidth}" width="${lineWidth}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;

  return (
    <canvas
      style={{ cursor }}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      width={`860px`}
      height={`860px`}
      ref={canvasRef}
    />
  );
}
