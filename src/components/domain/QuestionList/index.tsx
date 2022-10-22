import styled from '@emotion/styled';
import { forwardRef, Ref } from 'react';
import { IQuestionItem, QuestionCategoryQuery } from '~/types/question';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import QuestionItem from './QuestionItem';

interface QuestionListProps {
  questions: IQuestionItem[];
  currentCategory: QuestionCategoryQuery;
}

const QuestionList = forwardRef(
  ({ questions, currentCategory }: QuestionListProps, ref?: Ref<HTMLLIElement>) => {
    return (
      <Container>
        {questions.map((question, index) => (
          <QuestionItem
            question={question}
            key={question.id}
            ref={index === questions.length - 1 ? ref : null}
            currentCategory={currentCategory}
          />
        ))}
      </Container>
    );
  },
);

export default QuestionList;

const Container = styled.ul`
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};

  ${mediaQuery('md')} {
    margin-left: -16px;
    margin-right: -16px;
    padding: 0 16px;
  }
`;
