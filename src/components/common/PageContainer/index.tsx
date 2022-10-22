import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children, ...props }: PageContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default PageContainer;

const StyledContainer = styled.div`
  max-width: 872px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
`;
