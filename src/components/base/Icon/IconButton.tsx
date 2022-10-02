import styled from '@emotion/styled';
import Icon, { IconProps } from '.';

interface IconButtonProps extends IconProps {
  onClick?: () => void;
}

const IconButton = ({ name, size = '20', color = 'white', onClick }: IconButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <Icon name={name} size={size} color={color} />
    </StyledButton>
  );
};

export default IconButton;

const StyledButton = styled.button`
  svg {
    display: block;
  }
`;
