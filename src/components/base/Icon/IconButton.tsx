import styled from '@emotion/styled';
import Icon, { IconProps } from '.';

interface IconButtonProps extends IconProps {
  onClick?: () => void;
}

const IconButton = ({ name, size = '20', color = 'white', onClick }: IconButtonProps) => {
  return (
    <button onClick={onClick}>
      <Icon name={name} size={size} color={color} />
    </button>
  );
};

export default IconButton;
