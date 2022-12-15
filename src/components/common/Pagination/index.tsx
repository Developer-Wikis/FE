import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Icon from '~/components/base/Icon';

const VIEW_PAGE_SIZE = 5;
export const PAGE_SIZE = 20;
const ZERO_INDEX = 1;

interface PaginationProps {
  totalElements: number;
  current?: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

const Pagination = ({
  totalElements,
  current = 0,
  pageSize = PAGE_SIZE,
  onChange,
  ...props
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(current);
  const totalPage = Math.ceil(totalElements / pageSize);

  const handleChange = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    onChange(page);
  };

  useEffect(() => {
    setCurrentPage(current);
  }, [totalElements]);

  return (
    <Container {...props}>
      {totalPage > VIEW_PAGE_SIZE && (
        <MoveButton onClick={() => handleChange(currentPage - 1)} disabled={currentPage <= 0}>
          <span className="screen-out">이전 페이지로 이동</span>
          <Icon name="ArrowLeft" size="14" color="gray800" />
        </MoveButton>
      )}

      {Array.from(new Array(totalPage), (_, index) => index)
        .filter((index) => {
          const centerOffset = Math.ceil(VIEW_PAGE_SIZE / 2);
          const halfOffset = Math.floor(VIEW_PAGE_SIZE / 2);

          if (currentPage < centerOffset) {
            return index < VIEW_PAGE_SIZE;
          } else if (currentPage > totalPage - centerOffset) {
            return index >= totalPage - VIEW_PAGE_SIZE;
          }
          return index >= currentPage - halfOffset && index <= currentPage + halfOffset;
        })
        .map((page) => (
          <PageButton
            key={page}
            onClick={() => handleChange(page)}
            className={currentPage === page ? 'is-active' : undefined}
          >
            {ZERO_INDEX + page}
          </PageButton>
        ))}

      {totalPage > VIEW_PAGE_SIZE && (
        <MoveButton
          onClick={() => handleChange(currentPage + 1)}
          disabled={currentPage >= totalPage - 1}
        >
          <span className="screen-out">다음 페이지로 이동</span>
          <Icon name="ArrowRight" size="14" color="gray800" />
        </MoveButton>
      )}
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoveButton = styled.button`
  width: 33px;
  height: 33px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;

  svg {
    margin: 0 auto;
  }

  &:first-of-type {
    margin-right: 10px;
  }

  &:last-of-type {
    margin-left: 10px;
  }

  &:disabled {
    opacity: 0.7;
    background-color: ${({ theme }) => theme.colors.gray100};
    cursor: not-allowed;
  }
`;

const PageButton = styled.button`
  width: 26px;
  height: 26px;
  border: 0;
  ${({ theme }) => theme.fontStyle.body2}
  text-align: center;
  color: ${({ theme }) => theme.colors.gray800};
  user-select: none;

  &.is-active {
    color: ${({ theme }) => theme.colors.red};
  }

  & ~ & {
    margin-left: 5px;
  }
`;
