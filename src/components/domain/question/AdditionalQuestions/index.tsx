import styled from '@emotion/styled';
import { useState } from 'react';

interface Props {
  questions: string[];
}

const AdditionalQuestions = ({ questions }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <AccordionTitle>
        <h3>예상되는 꼬리 질문 보기</h3>
        <button onClick={onClickButton}>버튼</button>
      </AccordionTitle>
      {isOpen && (
        <AccordionContent>
          {questions.map((question, index) => (
            <li key={index}>⦁ {question}</li>
          ))}
        </AccordionContent>
      )}
    </Container>
  );
};

export default AdditionalQuestions;

const Container = styled.div`
  margin-top: 42px;
  width: 420px;
`;
const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 13px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray}; ;
`;

const AccordionContent = styled.ul`
  padding: 16px 13px;
  li {
    padding: 8px 0;
  }
`;
