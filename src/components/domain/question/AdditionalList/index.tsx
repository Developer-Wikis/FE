import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';

interface AdditionalListProps {
  list: string[];
  onRemove: (index: number) => void;
}

const AdditionalList = ({ list, onRemove }: AdditionalListProps) => {
  return (
    <StyledUl>
      {list.map((question, index) => (
        <li key={index}>
          <span>{question}</span>
          <button onClick={() => onRemove(index)}>
            <Icon name="Close" size="10" color="darkGray" />
          </button>
        </li>
      ))}
    </StyledUl>
  );
};

export default AdditionalList;

const StyledUl = styled.ul`
  li {
    margin-top: 12px;
    font-size: 14px;
    padding: 8px 10px;
    background-color: ${({ theme }) => theme.colors.bgGray};
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      line-height: 1.5;
    }
  }
`;
