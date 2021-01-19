import React from 'react';

interface ButtonProps {
  onClick?: () => {};
  type?: 'submit' | 'button' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...otherProps
}) => {
  return (
    <button
      type="button"
      {...otherProps}
      onClick={onClick}
      className="bg-indigo-800 w-32 mx-auto mt-8 p-2 text-indigo-200 rounded hover:bg-indigo-600 shadow-lg hover:scale-110 transform transition duration-250 uppercase"
    >
      {children}
    </button>
  );
};

export default Button;
