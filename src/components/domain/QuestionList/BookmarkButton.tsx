import styled from '@emotion/styled';
import React from 'react';
import Icon from '~/components/base/Icon';
import { mediaQuery } from '~/utils/helper/mediaQuery';

export interface BookmarkButtonProps {
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const BookmarkButton = ({ isBookmarked, onBookmarkToggle }: BookmarkButtonProps) => {
  return (
    <StyledIconButton
      name="Star"
      width="21"
      height="20"
      fill={isBookmarked ? 'red' : 'gray100'}
      stroke={isBookmarked ? 'red' : 'gray300'}
      onClick={onBookmarkToggle}
      aria-label={`북마크 ${isBookmarked ? '삭제' : '추가'}하기`}
    />
  );
};

export default BookmarkButton;

const StyledIconButton = styled(Icon.Button)`
  display: inline-block;
  width: 59px;
  padding: 18px 19px 20px;
  border-right: 1px solid ${({ theme }) => theme.colors.gray300};

  ${mediaQuery('sm')} {
    order: 1;
    width: auto;
    border-right: 0;
    padding: 0;

    svg {
      width: 24px;
      height: 23px;
    }
  }
`;
