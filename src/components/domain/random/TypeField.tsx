import styled from '@emotion/styled';
import { ChangeEvent } from 'react';
import Icon from '~/components/base/Icon';
import useHover from '~/hooks/useHover';

interface TypeFieldProps {
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TypeField = ({ type, handleChange }: TypeFieldProps) => {
  const [hoverRef, isHover] = useHover<HTMLSpanElement>();

  return (
    <fieldset>
      <TypeLegend>
        <Legend>질문 유형</Legend>
        <span ref={hoverRef}>
          <Icon name="AlertCircle" color="red" size="14px" block={false} />
        </span>

        <Tooltip show={isHover}>
          음성 면접 연습 : 랜덤 질문이 <strong>음성</strong>으로 나타나며 1분의 답변 시간이
          주어집니다.
          <br />
          자유 면접 연습 : 랜덤 질문이 <strong>텍스트</strong>로 나타나며 자유롭게 답변하실 수
          있습니다.
        </Tooltip>
      </TypeLegend>

      <Radio
        type="radio"
        name="type"
        id="voice"
        checked={type === 'voice'}
        onChange={handleChange}
      />
      <RadioLabel htmlFor="voice"> 음성 면접 연습</RadioLabel>

      <Radio type="radio" name="type" id="text" checked={type === 'text'} onChange={handleChange} />
      <RadioLabel htmlFor="text"> 자유 면접 연습</RadioLabel>
    </fieldset>
  );
};

export default TypeField;

const Radio = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  vertical-align: middle;
  accent-color: ${({ theme }) => theme.colors.red};
  cursor: pointer;

  ~ input {
    margin-left: 18px;
  }
`;

const RadioLabel = styled.label`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blackGray};
  vertical-align: bottom;
  cursor: pointer;
`;

const TypeLegend = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;

  svg {
    cursor: pointer;
  }
`;

const Legend = styled.legend`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blackGray};
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  width: 478px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 8px 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.white};
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: none;

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.blackGray};
  }
`;
