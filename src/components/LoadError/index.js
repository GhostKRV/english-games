import React from 'react';

const LoadError = ({ error }) => {
  const { message = error, code = null } = error;
  return (
    <div align="center">
      <p>{code}</p>
      <p>{message}</p>
    </div>
  );
};

export default LoadError;
