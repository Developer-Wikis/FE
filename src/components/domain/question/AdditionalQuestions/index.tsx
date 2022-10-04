import styled from '@emotion/styled';
import { useState } from 'react';
import Icon from '~/components/base/Icon';

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
        <Title>예상되는 꼬리 질문 보기</Title>
        {isOpen ? (
          <Icon.Button name="ArrowUp" size="24" color="blackGray" onClick={onClickButton} />
        ) : (
          <Icon.Button name="ArrowDown" size="24" color="blackGray" onClick={onClickButton} />
        )}
      </AccordionTitle>
      {isOpen && (
        <AccordionContent>
          {questions.length > 0
            ? questions.map((question, index) => <li key={index}>⦁ {question}</li>)
            : '등록된 꼬리 질문이 없습니다.'}
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

const Title = styled.h3`
  font-size: 18px;
`;

const AccordionContent = styled.ul`
  padding: 16px 13px;

  li {
    padding: 8px 0;
  }
`;
