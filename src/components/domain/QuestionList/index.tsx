import styled from '@emotion/styled';
import { forwardRef, Ref } from 'react';
import { IQuestionItem } from '~/types/question';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import QuestionItem, { QuestionItemProps } from './QuestionItem';

interface QuestionListProps extends Omit<QuestionItemProps, 'question'> {
  questions: IQuestionItem[];
}

const QuestionList = forwardRef(
  (
    { questions, currentCategory, onBookmarkToggle }: QuestionListProps,
    ref?: Ref<HTMLLIElement>,
  ) => {
    return (
      <Container>
        {questions.map((question, index) => (
          <QuestionItem
            question={question}
            key={question.id}
            ref={index === questions.length - 1 ? ref : null}
            currentCategory={currentCategory}
            onBookmarkToggle={onBookmarkToggle}
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

  ${mediaQuery('sm')} {
    margin-top: 0;
    border-top: 0;
  }
`;
