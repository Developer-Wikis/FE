import styled from '@emotion/styled';
import { IQuestionItem } from '~/types/question';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import QuestionItem, { QuestionItemProps } from './QuestionItem';

interface QuestionListProps extends Omit<QuestionItemProps, 'question'> {
  questions: IQuestionItem[];
}

const QuestionList = ({
  questions,
  currentCategory,
  onBookmarkToggle,
  ...props
}: QuestionListProps) => {
  return (
    <Container {...props}>
      {questions.map((question) => (
        <QuestionItem
          question={question}
          key={question.id}
          currentCategory={currentCategory}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </Container>
  );
};

export default QuestionList;

const Container = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};

  ${mediaQuery('sm')} {
    border-top: 0;
  }
`;
