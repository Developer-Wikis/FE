import styled from '@emotion/styled';
import { useState } from 'react';
import Button from '~/components/base/Button';
import Icon from '~/components/base/Icon';
import Link from '~/components/base/Link';

interface Props {
  questions: string[];
  onModalOpen: () => void;
}

const AdditionalQuestions = ({ questions, onModalOpen }: Props) => {
  const [isOpen, setIsOpen] = useState(questions.length === 0);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <AccordionTitle>
        <Title>예상되는 꼬리 질문 보기</Title>
        {isOpen ? (
          <Icon.Button name="ArrowUp" size="24" color="gray800" onClick={onClickButton} />
        ) : (
          <Icon.Button name="ArrowDown" size="24" color="gray800" onClick={onClickButton} />
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
          <StyledButton size="sm" buttonType="black" onClick={onModalOpen}>
            꼬리 질문 등록
          </StyledButton>
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300}; ;
`;

const Title = styled.strong`
  ${({ theme }) => theme.fontStyle.subtitle2};
`;

const AccordionContent = styled.ul`
  padding: 16px 0;

  li {
    padding: 8px 0;
  }
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
  margin-top: 14px;
`;
