import React, { useRef, useEffect, useState } from 'react';

import ModalWindow from '../ModalWindow';
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFirebaseData } from '../../actions/firebase';

import FirebaseWrapper from '../../containers/FirebaseWrapper';

const Wheel = (props) => {
  const { fortune = [] } = props;

  useEffect(() => {
    props.fetchFirebaseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (canvas.current !== null) {
      const context = canvas.current.getContext('2d');
      context.save();

      context.scale(circleParameters.pixelRatio, circleParameters.pixelRatio);
      context.fillStyle = 'rgba(255, 255, 255, 0.0)';
      context.fillRect(0, 0, circleParameters.width, circleParameters.height);

      context.translate(
        circleParameters.width / 2,
        circleParameters.height / 2,
      );

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
    }
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

  return (
    <FirebaseWrapper>
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
    </FirebaseWrapper>
  );
};

const mapStateToProps = (props) => ({
  fortune: props.fortune.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFirebaseData: fetchFirebaseData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
