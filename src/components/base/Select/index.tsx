import styled from '@emotion/styled';
import { ChangeEvent, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Select의 옵션 데이터를 설정합니다.
   */
  list: { value: string; text: string }[];
  name?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selected?: string;
  /**
   * true일 경우 기본 옵션을 제거합니다.
   */
  withoutDefault?: boolean;
  /**
   * 기본 옵션의 내용을 설정합니다.
   */
  defaultText?: string;
}
const Select = ({
  list,
  name,
  onChange,
  selected,
  withoutDefault = false,
  defaultText = '선택해 주세요.',
  ...props
}: SelectProps) => {
  return (
    <StyledSelect name={name} id={name} onChange={onChange} value={selected} {...props}>
      {!withoutDefault && <option value="none">{defaultText}</option>}
      {list.map((category, index) => (
        <option key={index} value={category.value}>
          {category.text}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;

const StyledSelect = styled.select`
  width: 100%;

  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  ${({ theme }) => theme.fontStyle.body2};
`;
