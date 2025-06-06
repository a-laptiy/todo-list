import React from 'react';
import cn from 'classnames';

const Button = ({
  children,
  disabled = false,
  theme,
  active = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'button',
        theme && `button--${theme}`,
        active && 'active'
      )}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
