import React, { useEffect, useRef, MutableRefObject } from 'react';
import generateBillboard from './generateBillboard.ts';

interface Props {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  slogan: string;
  subheader: string;
  width: number;
  height: number;
  userImage?: HTMLImageElement | null,
}

const Billboard: React.FC<Props> = ({ canvasRef, slogan, subheader, width, height, userImage }) => {
  const internalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const onRef = (node: HTMLCanvasElement | null) => {
    internalCanvasRef.current = node;
    canvasRef.current = node;
  }

  useEffect(() => {
    const canvas = internalCanvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      canvas.dataset.slogan = slogan;

      generateBillboard(canvas, userImage || null, slogan, subheader)
        .catch(console.error);
    }
  }, [slogan, subheader, width, height, userImage]);

  return (
    <div className="canvas-container">
      <canvas id="slogan-canvas" ref={onRef} width={width} height={height}></canvas>
    </div>
  );
};

export default Billboard;