import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';

interface TailQuestionListProps {
  list: string[];
  onRemove: (index: number) => void;
}

const TailQuestionList = ({ list, onRemove }: TailQuestionListProps) => {
  return (
    <StyledUl>
      {list.map((question, index) => (
        <li key={index}>
          <span>{question}</span>
          <button onClick={() => onRemove(index)}>
            <Icon name="Close" size="10" color="gray600" />
          </button>
        </li>
      ))}
    </StyledUl>
  );
};

export default TailQuestionList;

const StyledUl = styled.ul`
  li {
    margin-top: 12px;
    ${({ theme }) => theme.fontStyle.body2};
    padding: 8px 10px;
    background-color: ${({ theme }) => theme.colors.gray200};
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      line-height: 1.5;
    }
  }
`;
