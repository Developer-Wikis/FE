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
  width: 840px;
  margin: 0 auto;
`;
