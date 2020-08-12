import React, { useState, useRef, useEffect } from 'react';

import fortune_data from '../../data/fortune.json';

import './index.css';

function Fortune() {
  const circleParameters = {
    width: 700,
    height: 700,
    pixelRatio: window.devicePixelRatio,
  };

  const [rotateD, setRotateD] = useState(0);

  const rounds = Math.random() * 6000 + 7000;

  function spin() {
    for (let i = rotateD; i < rotateD + rounds; i++) {
      setTimeout(() => {
        setRotateD(i % 360);
        if (i > rotateD + rounds - 1) {
          alert(25 - Math.round(((rounds + rotateD) % 360) / (360 / 25)) + 1);
        }
      }, 10);
    }
  }

  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');

    context.save();
    context.scale(circleParameters.pixelRatio, circleParameters.pixelRatio);
    context.fillStyle = 'hsl(0, 0%, 96%)';
    context.fillRect(0, 0, circleParameters.width, circleParameters.height);

    context.beginPath();
    context.moveTo(
      circleParameters.width - 10,
      circleParameters.height / 2 - 20,
    );
    context.lineTo(circleParameters.width - 80, circleParameters.height / 2);
    context.lineTo(
      circleParameters.width - 10,
      circleParameters.height / 2 + 20,
    );
    context.closePath();
    context.fillStyle = '#000033';
    context.fill();
    context.stroke();

    context.translate(circleParameters.width / 2, circleParameters.height / 2);
    context.rotate((Math.PI / 180) * rotateD);

    fortune_data.map((data, index) => {
      context.strokeStyle = data.color;

      context.lineWidth = '40';
      context.beginPath();
      context.arc(
        0,
        0,
        circleParameters.width / 2.9,
        (Math.PI * 2 * index) / fortune_data.length,
        (Math.PI * 2 * ++index) / fortune_data.length,
      );
      context.stroke();
    });
    context.restore();
  });

  const dw = Math.floor(circleParameters.pixelRatio * circleParameters.width);
  const dh = Math.floor(circleParameters.pixelRatio * circleParameters.height);
  const style = {
    width: circleParameters.width,
    height: circleParameters.height,
  };

  return (
    <div>
      <h1>ALL GOOD</h1>
      <canvas
        className="circle"
        ref={canvas}
        width={dw}
        height={dh}
        style={style}
      />
      <button
        onClick={() => {
          spin();
        }}
      >
        Rotate
      </button>
    </div>
  );
}

export default Fortune;
