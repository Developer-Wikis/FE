import styled from '@emotion/styled';

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
          <button onClick={() => onRemove(index)}>삭제</button>
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
  }
`;
