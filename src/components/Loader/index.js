import React from 'react';

import { CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <div align="center">
      <CircularProgress color="inherit" size={20} />
    </div>
  );
};

export default Loader;
