import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

interface SelectProps {
  list: string[];
  name?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
const Select = ({ list, name, onChange, ...props }: SelectProps) => {
  return (
    <StyledSelect name={name} id={name} onChange={onChange} {...props}>
      <option value="none">선택해주세요</option>
      {list.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;

const StyledSelect = styled.select`
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  font-size: 14px;
`;
