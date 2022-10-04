import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';
import Link from '~/components/base/Link';
import { IQuestionItem } from '~/types/question';
import { formatNumber } from '../../../utils/helper/formatting';
import { forwardRef, Ref } from 'react';

interface QuestionItemProps {
  question: IQuestionItem;
}

const QuestionItem = forwardRef(({ question }: QuestionItemProps, ref?: Ref<HTMLLIElement>) => {
  return (
    <StyledItem ref={ref}>
      <Link href={`/question/${question.id}`}>
        <CategoryName title={question.category}>
          <span>{question.category}</span>
        </CategoryName>
        <QuestionTitle title={question.title}>
          <span>{question.title}</span>
        </QuestionTitle>
        <QuestionInfo>
          <QuestionInfoItem title={String(question.viewCount)}>
            <Icon name="Eye" color="darkGray" size="15" />
            {formatNumber(question.viewCount)}
          </QuestionInfoItem>
          <QuestionInfoItem title={String(question.commentCount)}>
            <Icon name="Comment" color="darkGray" size="15" />
            {formatNumber(question.commentCount)}
          </QuestionInfoItem>
        </QuestionInfo>
      </Link>
    </StyledItem>
  );
});

export default QuestionItem;

const StyledItem = styled.li`
  a {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
`;

const CategoryName = styled.div`
  font-size: 14px;
  padding: 0 20px;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
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
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
`;
const QuestionInfoItem = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;

  ~ span {
    margin-left: 17.5px;
  }
`;
