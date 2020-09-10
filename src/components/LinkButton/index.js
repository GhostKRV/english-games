import React from 'react';

import { Button } from '@material-ui/core/';

const LinkButton = React.forwardRef((props, ref) => {
  const {
    href = '/',
    variant = 'outlined',
    size = 'large',
    color = 'default',
    className = null,
  } = props;

  return (
    <Button
      ref={ref}
      className={className}
      variant={variant}
      color={color}
      size={size}
      onClick={() => {
        window.location.href = href;
      }}
    >
      {props.children}
    </Button>
  );
});

export default LinkButton;
