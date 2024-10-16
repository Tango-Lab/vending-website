import classNames from 'classnames';
import React from 'react';

export interface ButtonTypeProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  children?: React.ReactNode;
  theme?: 'default' | 'light' | 'danger';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Button = (props: ButtonTypeProps) => {
  const { children, type, className, theme = 'default', disabled = false, onClick } = props;

  const ctxTheme = classNames({
    'text-white bg-blue-700 hover:bg-primary-800': theme === 'default',
    'text-white bg-danger border border-gray-300 hover:bg-danger-400': theme === 'danger',
    'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100': theme === 'light',
  });
  const ctxClass = classNames(className, 'rounded-lg text-sm px-5 py-2.5 text-center', ctxTheme);

  return (
    <button className={ctxClass} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
