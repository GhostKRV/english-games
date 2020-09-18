import React, { useRef, useEffect, useState } from 'react';

import ModalWindow from '../ModalWindow';
import { Button, CircularProgress } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFortuneData } from '../../actions/fortune';

const mapStateToProps = (props) => ({
  fortune: props.fortune.fortune,
  common: props.common,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFortuneData: fetchFortuneData,
    },
    dispatch,
  );

const Wheel = (props) => {
  const {
    fortune = [],
    common: { init = false, error = null },
  } = props;

  if (init) {
    props.fetchFortuneData();
  }

  const [rotateDegree, setRotateD] = useState(0.0);
  const [modalProps, setModalProps] = useState({
    isActive: false,
    questionText: '',
  });

  function question(deg) {
    const questionNumber = Math.floor(
      fortune.length - (deg % 360) / (360 / fortune.length),
    );
    setModalProps({
      isActive: true,
      questionText: fortune[questionNumber].question,
    });
  }

  function spin() {
    const rounds = Math.ceil(Math.random() * 1000 + 3000);

    setRotateD(rotateDegree + rounds);
    canvas.current.style.transform =
      'rotate(' + (rounds + rotateDegree) + 'deg)';
    setTimeout(() => {
      question((rotateDegree + rounds) % 360);
    }, 2000);
  }

  const circleParameters = {
    width: 500,
    height: 500,
    pixelRatio: window.devicePixelRatio,
  };

  const canvas = useRef(null);

  useEffect(() => {
    const context = canvas.current.getContext('2d');
    context.save();

    context.scale(circleParameters.pixelRatio, circleParameters.pixelRatio);
    context.fillStyle = 'rgba(255, 255, 255, 0.0)';
    context.fillRect(0, 0, circleParameters.width, circleParameters.height);

    context.translate(circleParameters.width / 2, circleParameters.height / 2);

    context.lineWidth = '150';

    fortune.forEach((data, index) => {
      context.strokeStyle = data.color;
      context.beginPath();
      context.arc(
        0,
        0,
        circleParameters.width / 3,
        (Math.PI * 2 * index) / fortune.length,
        (Math.PI * 2 * ++index) / fortune.length,
      );

      context.stroke();
    });

    context.restore();
  }, [
    circleParameters.height,
    circleParameters.pixelRatio,
    circleParameters.width,
    fortune,
    rotateDegree,
  ]);

  const dw = Math.floor(circleParameters.pixelRatio * circleParameters.width);
  const dh = Math.floor(circleParameters.pixelRatio * circleParameters.height);
  const style = {
    width: circleParameters.width,
    height: circleParameters.height,
  };

  if (fortune.length === 0 && error === null) {
    return (
      <div>
        <canvas ref={canvas} style={{ display: 'none' }} />
        <CircularProgress color="inherit" size={20} />
      </div>
    );
  } else if (error) {
    return (
      <div>
        <canvas ref={canvas} style={{ display: 'none' }} />
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="Wheel">
      <ModalWindow
        isActive={modalProps.isActive}
        questionText={modalProps.questionText}
        onClose={() => {
          setModalProps({
            isActive: false,
          });
        }}
      />
      <canvas
        className="canvasWheel"
        ref={canvas}
        width={dw}
        height={dh}
        style={style}
      />
      <div className="doSpin">
        <ArrowBackIosIcon fontSize="large" />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
