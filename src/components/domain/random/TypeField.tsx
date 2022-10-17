import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

interface TypeFieldProps {
  type: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TypeField = ({ type, handleChange }: TypeFieldProps) => {
  return (
    <fieldset>
      <Legend>질문 유형</Legend>

      <Radio
        type="radio"
        name="type"
        id="voice"
        checked={type === 'voice'}
        onChange={handleChange}
      />
      <RadioLabel htmlFor="voice"> 음성 면접 연습</RadioLabel>
      <FirstNotice>
        질문이 <strong>음성</strong>으로 나타나며 1분의 답변 시간이 주어집니다.
      </FirstNotice>

      <Radio type="radio" name="type" id="text" checked={type === 'text'} onChange={handleChange} />
      <RadioLabel htmlFor="text"> 자유 면접 연습</RadioLabel>
      <Notice>
        질문이 <strong>텍스트</strong>로 나타나며 자유롭게 답변하실 수 있습니다.
      </Notice>
    </fieldset>
  );
};

export default TypeField;

const Legend = styled.legend`
  margin-bottom: 19px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray800};
`;

const Radio = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  vertical-align: middle;
  accent-color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

const RadioLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray800};
  vertical-align: bottom;
  cursor: pointer;
`;

const Notice = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray600};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

const FirstNotice = styled(Notice)`
  margin-bottom: 18px;
`;
