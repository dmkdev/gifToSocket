import React, { useEffect, useRef } from 'react';

export interface IGifFrame { 
  imageData: ArrayBuffer,
  width: number, 
  height: number
}

interface FrameViewerProps {
  data?: IGifFrame,
  onNext: () => void;
}

const FrameViewer: React.FC<FrameViewerProps> = ({ data, onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context || !data) return;

    canvas.width = data.width;
    canvas.height = data.height;
    const img = new ImageData(new Uint8ClampedArray(data.imageData), data.width, data.height);
    context.putImageData(img, 0, 0);

  }, [data]);

  return (
    <div style={{
      textAlign: 'center'
    }}>
      <canvas ref={canvasRef} />
      <div>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default FrameViewer;

/**
 * Один из способов отрисовать в канвасе сырые данные:

context.clearRect(0, 0, canvas.width, canvas.height);
const img = new Image();
img.onload = function(){
  context.drawImage(img, 0, 0);
};
img.src = URL.createObjectURL(new Blob([data]));

*/