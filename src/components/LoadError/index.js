import React from 'react';

const LoadError = ({ error }) => {
  const { message = null, code = null } = error;
  return (
    <div align="center">
      <p>{code}</p>
      <p>{message}</p>
    </div>
  );
};

export default LoadError;
