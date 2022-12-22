import styled from '@emotion/styled';
import CommentItem from './CommentItem';
import Pagination from '~/components/common/Pagination';
import NoResult from './NoResult';
import useProfileComment from '~/react-query/hooks/useProfileComment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Comment = () => {
  const [isReady, setIsReady] = useState(false);
  const { data, query, setQuery, setQueryWithoutUrl } = useProfileComment(isReady);
  const router = useRouter();

  const handlePage = (page: number) => setQuery({ ...query, page });

  useEffect(() => {
    if (!router.isReady || router.query.tab !== 'comment') return;

    const initialValues = { page: 0 };
    const filteredQuery = filter({ page: router.query.page }, initialValues);

    setQueryWithoutUrl(filteredQuery);
    setIsReady(true);
  }, [router.isReady, router.query.page]);

  if (data.totalElements === 0) return <NoResult>작성한 댓글이 없습니다.</NoResult>;
  return (
    <>
      <StyledUl>
        {data.content.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      </StyledUl>

      <Pagination
        current={query.page}
        totalElements={data.totalElements}
        onChange={handlePage}
        key={query.page}
      />
    </>
  );
};

export default Comment;

function filter(
  query: Record<'page', string | string[] | undefined>,
  defaultValue: { page: number },
) {
  const { page } = query;

  if (!Number.isInteger(Number(page))) return defaultValue;
  return { page: Number(page) };
}

const StyledUl = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  margin-bottom: 32px;
`;
