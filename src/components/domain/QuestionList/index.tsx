import styled from '@emotion/styled';
import { forwardRef, Ref } from 'react';
import { IQuestionItem } from '~/types/question';
import QuestionItem from './QuestionItem';

interface QuestionListProps {
  questions: IQuestionItem[];
}

const QuestionList = forwardRef(({ questions }: QuestionListProps, ref?: Ref<HTMLLIElement>) => {
  return (
    <Container>
      {questions.map((question, index) => (
        <QuestionItem
          question={question}
          key={question.id}
          ref={index === questions.length - 1 ? ref : null}
        />
      ))}
    </Container>
  );
});

export default QuestionList;

const Container = styled.ul`
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;
