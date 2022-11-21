import styled from '@emotion/styled';
import Link from '~/components/base/Link';
import { convertSubCategory } from '~/utils/helper/converter';
import { formatDate } from '~/utils/helper/formatting';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import { TComment } from './Comment';

interface CommentListProps {
  comment: TComment;
}

const CommentItem = ({ comment }: CommentListProps) => {
  return (
    <li key={comment.id}>
      <StyledLink href="">
        <CategoryName title={convertSubCategory(comment.subCategory)}>
          <span>{convertSubCategory(comment.subCategory)}</span>
        </CategoryName>

        <Content>
          <QuestionTitle title={comment.title}>{comment.title}</QuestionTitle>
          <CommentContent title={comment.content}>{comment.content}</CommentContent>
        </Content>

        <CreatedAt>{formatDate(comment.createdAt)}</CreatedAt>
      </StyledLink>
    </li>
  );
};

export default CommentItem;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 25px 16px 19px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const CategoryName = styled.div`
  padding-right: 20px;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  ${({ theme }) => theme.fontStyle.body2_500}
  color: ${({ theme }) => theme.colors.gray600};

  ${mediaQuery('sm')} {
    width: 100px;
  }
`;

const Content = styled.div`
  overflow: hidden;
`;

const QuestionTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray500};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CommentContent = styled.span`
  display: block;
  ${({ theme }) => theme.fontStyle.body1}
  color: ${({ theme }) => theme.colors.gray800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreatedAt = styled.span`
  flex-grow: 1;
  flex-shrink: 0;
  padding-left: 25px;
  text-align: right;
  ${({ theme }) => theme.fontStyle.body2}
  color: ${({ theme }) => theme.colors.gray500};
`;
