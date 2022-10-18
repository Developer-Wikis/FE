import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import Icon, { IconProps } from '.';

interface IconButtonProps extends IconProps {
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  style?: CSSProperties;
}

const IconButton = ({
  name,
  size = '20',
  color = 'white',
  onClick,
  type = 'button',
  style,
}: IconButtonProps) => {
  return (
    <button onClick={onClick} type={type} style={style}>
      <Icon name={name} size={size} color={color} />
    </button>
  );
};

export default IconButton;
