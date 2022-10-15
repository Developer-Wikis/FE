import styled from '@emotion/styled';
import Icon, { IconProps } from '.';

interface IconButtonProps extends IconProps {
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

const IconButton = ({
  name,
  size = '20',
  color = 'white',
  onClick,
  type = 'button',
}: IconButtonProps) => {
  return (
    <button onClick={onClick} type={type}>
      <Icon name={name} size={size} color={color} />
    </button>
  );
};

export default IconButton;
