import styled from '@emotion/styled';
import { useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';

interface Props {
  questions: string[];
}

const AdditionalQuestions = ({ questions }: Props) => {
  const [isOpen, setIsOpen] = useState(questions.length === 0);

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
        <>
          <AccordionContent>
            {questions.length > 0 ? (
              questions.map((question, index) => <li key={index}>⦁ {question}</li>)
            ) : (
              <p>등록된 꼬리 질문이 없습니다.</p>
            )}
          </AccordionContent>
          <AddButton size="sm">꼬리 질문 등록</AddButton>
        </>
      )}
    </Container>
  );
};

export default AdditionalQuestions;

const Container = styled.div`
  margin-top: 42px;
  width: 420px;
  padding: 0 14px;
`;

const AccordionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray}; ;
`;

const Title = styled.h3`
  font-size: 18px;
`;

const AccordionContent = styled.ul`
  padding: 16px 0;

  li {
    padding: 8px 0;
  }
`;

const AddButton = styled(Button)`
  display: block;
  font-size: 14px;
  margin: 0 auto;
  margin-top: 14px;
`;
