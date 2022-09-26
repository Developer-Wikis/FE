import styled from '@emotion/styled';
import Link from '~/components/base/Link';
import { IQuestionItem } from '~/types/question';

interface QuestionItemProps {
  question: IQuestionItem;
}

const QuestionItem = ({ question }: QuestionItemProps) => {
  return (
    <StyledItem key={question.id}>
      <Link href={`/question/${question.id}`}>
        <CategoryName>
          <span>{question.category}</span>
        </CategoryName>
        <QuestionTitle>
          <span>{question.title}</span>
        </QuestionTitle>
        <QuestionInfo>
          <i>댓글</i>
          <span>{question.commentCount}</span>
        </QuestionInfo>
      </Link>
    </StyledItem>
  );
};

export default QuestionItem;

const StyledItem = styled.li`
  a {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.LightGray};
  }
`;

const CategoryName = styled.div`
  padding: 0 20px;
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;

const QuestionTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const QuestionInfo = styled.div`
  flex-grow: 1;
  text-align: right;
  padding: 0 20px;
  flex-shrink: 0;
`;
