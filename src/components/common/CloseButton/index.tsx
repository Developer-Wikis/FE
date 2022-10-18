import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick, ...props }: CloseButtonProps) => {
  return <StyledButton name="Close" color="gray800" size="14" onClick={onClick} {...props} />;
};

export default CloseButton;

const StyledButton = styled(Icon.Button)`
  padding: 6px;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;
