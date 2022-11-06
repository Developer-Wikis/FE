import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { mediaQuery } from '~/utils/helper/mediaQuery';

interface ArticleProps extends HTMLAttributes<HTMLElement> {
  full?: boolean;
}

const Article = ({ full = false, ...props }: ArticleProps) => {
  return <StyledArticle full={full} {...props} />;
};

export default Article;

const StyledArticle = styled.article<{ full: boolean }>`
  width: 100%;
  max-width: ${({ full }) => (full ? '100%' : '440px')};
  margin: 0 auto;
  margin-top: 50px;
  padding: ${({ full }) => (full ? '30px 0 50px' : '42px 28px 45px')};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};

  ${mediaQuery(440)} {
    border: 0;
    width: 100%;
    margin-top: 0;
    padding: ${({ full }) => (full ? '30px 16px 50px' : '42px 16px 45px')};
  }
`;
