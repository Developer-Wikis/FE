import styled from '@emotion/styled';
import { IQuestionItem } from '~/types/question';
import QuestionItem from './QuestionItem';

interface QuestionListProps {
  questions: IQuestionItem[];
}

const QuestionList = ({ questions }: QuestionListProps) => {
  return (
    <Container>
      {questions.map((question) => (
        <QuestionItem question={question} key={question.id} />
      ))}
    </Container>
  );
};

export default QuestionList;

const Container = styled.div`
  margin-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;
