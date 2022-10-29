import styled from '@emotion/styled';
import { useState } from 'react';
import Icon from '~/components/base/Icon';

const WINDOW_SIZE = 5;
const PAGE_SIZE = 20;
const ZERO_INDEX = 1;
interface PaginationProps {
  totalItem: number;
  current?: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

const Pagination = ({
  totalItem,
  current = 0,
  pageSize = PAGE_SIZE,
  onChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(current);
  const totalPage = Math.ceil(totalItem / pageSize);

  const handleChange = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    onChange(page);
  };

  const isVisiblePrevButton = () => totalPage > WINDOW_SIZE && currentPage > 0;
  const isVisibleNextButton = () => totalPage > WINDOW_SIZE && currentPage < totalPage - 1;

  return (
    <Container>
      <MoveButton onClick={() => handleChange(currentPage - 1)} isVisible={isVisiblePrevButton()}>
        <Icon name="ArrowLeft" size="14" color="gray800" />
      </MoveButton>

      {Array.from(new Array(totalPage), (_, index) => index)
        .filter((index) => {
          const windowCenter = Math.ceil(WINDOW_SIZE / 2);
          const windowHalf = Math.floor(WINDOW_SIZE / 2);

          if (currentPage < windowCenter) {
            return index < WINDOW_SIZE;
          } else if (currentPage > totalPage - windowCenter) {
            return index >= totalPage - WINDOW_SIZE;
          }
          return index >= currentPage - windowHalf && index <= currentPage + windowHalf;
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

      <MoveButton onClick={() => handleChange(currentPage + 1)} isVisible={isVisibleNextButton()}>
        <Icon name="ArrowRight" size="14" color="gray800" />
      </MoveButton>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoveButton = styled.button<{ isVisible: boolean }>`
  width: 33px;
  height: 33px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};

  svg {
    margin: 0 auto;
  }

  &:first-of-type {
    margin-right: 10px;
  }

  &:last-of-type {
    margin-left: 10px;
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
