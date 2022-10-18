import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <Message>
      <Icon name="AlertCircle" size="14" color="red" />
      <span>{message}</span>
    </Message>
  );
};

export default ErrorMessage;

const Message = styled.p`
  display: flex;
  margin-top: 8px;

  span {
    margin-left: 4px;
    color: ${({ theme }) => theme.colors.red};
    ${({ theme }) => theme.fontStyle.caption};
  }
`;
