import { CSSProperties, HTMLAttributes } from 'react';
import Icon, { IconProps } from '.';

interface IconButtonProps extends IconProps, Omit<HTMLAttributes<HTMLButtonElement>, 'color'> {
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
  ...props
}: IconButtonProps) => {
  return (
    <button onClick={onClick} type={type} style={style} {...props}>
      <Icon name={name} size={size} color={color} />
    </button>
  );
};

export default IconButton;
