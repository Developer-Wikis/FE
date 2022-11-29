import styled from '@emotion/styled';
import CommentItem from './CommentItem';
import Pagination from '~/components/common/Pagination';
import NoResult from './NoResult';
import { Paging } from '~/types/utilityType';
import { IProfileCommentItem } from '~/types/comment';

interface CommentProps {
  query: { page: number };
  data: Paging<IProfileCommentItem>;
  onChange: (value: { page: number }) => void;
}

const Comment = ({ query, data, onChange }: CommentProps) => {
  const handlePage = (page: number) => onChange({ ...query, page });

  if (data.totalElements === 0) return <NoResult>작성한 댓글이 없습니다.</NoResult>;
  return (
    <>
      <StyledUl>
        {data.content.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </StyledUl>

      <Pagination current={query.page} totalElements={data.totalElements} onChange={handlePage} />
    </>
  );
};

export default Comment;

const StyledUl = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  margin-bottom: 32px;
`;
