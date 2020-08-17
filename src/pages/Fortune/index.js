import React from 'react';

import Wheel from '../../components/Wheel';

import './index.css';

function Fortune() {
  return (
    <div className="gameFortune">
      <Wheel className="circle"></Wheel>
    </div>
  );
}

export default Fortune;
