import React, { useRef, useEffect, useState } from 'react';

import ModalWindow from '../ModalWindow';
import fortune_data from '../../data/fortune.json';
import Button from '@material-ui/core/Button';

import './index.css';

function Wheel() {
  const [rotateDegree, setRotateD] = useState(0.0);
  const [modalProps, setModalProps] = useState({
    isActive: false,
    questionText: '',
  });

  function timer(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function question(deg) {
    setModalProps({ isActive: false, questionText: '' });
    setRotateD(deg);
    const questionNumber = Math.floor(
      fortune_data.length - (deg % 360) / (360 / fortune_data.length),
    );
    console.log(fortune_data[questionNumber].question);
    setModalProps({
      isActive: true,
      questionText: fortune_data[questionNumber].question,
    });
  }

  async function spin() {
    const rounds = Math.ceil(Math.random() * 2000 + 3000);

    for (let i = rotateDegree; i <= rotateDegree + rounds; ) {
      if (i === rotateDegree + rounds) {
        question((rotateDegree + rounds) % 360);
      } else {
        setRotateD(i % 360);
      }
      i++;
      await timer(3);
    }
  }

  const circleParameters = {
    width: 600,
    height: 600,
    pixelRatio: window.devicePixelRatio,
  };

  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');

    context.save();
    context.scale(circleParameters.pixelRatio, circleParameters.pixelRatio);
    context.fillStyle = 'hsl(0, 0%, 100%)';
    context.fillRect(0, 0, circleParameters.width, circleParameters.height);

    context.beginPath();
    context.moveTo(
      circleParameters.width - 10,
      circleParameters.height / 2 - 20,
    );
    context.lineTo(circleParameters.width - 70, circleParameters.height / 2);
    context.lineTo(
      circleParameters.width - 10,
      circleParameters.height / 2 + 20,
    );
    context.closePath();
    context.fillStyle = '#000033';
    context.fill();
    context.stroke();

    context.translate(circleParameters.width / 2, circleParameters.height / 2);
    context.rotate((Math.PI / 180) * rotateDegree);

    fortune_data.map((data, index) => {
      context.strokeStyle = data.color;

      context.lineWidth = '150';
      context.beginPath();
      context.arc(
        0,
        0,
        circleParameters.width / 4,
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
    <div className="Wheel">
      <ModalWindow modalParams={modalProps} das="aaa" />
      <canvas
        className="canvasWheel"
        ref={canvas}
        width={dw}
        height={dh}
        style={style}
      />
      <div className="doSpin">
        <Button
          size="large"
          onClick={spin}
          variant="contained"
          color="secondary"
        >
          DO SPIN
        </Button>
      </div>
    </div>
  );
}

export default Wheel;
