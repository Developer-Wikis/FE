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
  fill,
  stroke,
  block,
  width,
  height,
  ...props
}: IconButtonProps) => {
  const iconProps = { name, size, color, fill, stroke, block, width, height };

  return (
    <button onClick={onClick} type={type} style={style} {...props}>
      <Icon {...iconProps} />
    </button>
  );
};

export default IconButton;
