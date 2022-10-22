import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { mediaQuery } from '~/utils/helper/mediaQuery';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children, ...props }: PageContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default PageContainer;

const StyledContainer = styled.div`
  max-width: 840px;
  margin: 0 auto;

  ${mediaQuery('md')} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;
