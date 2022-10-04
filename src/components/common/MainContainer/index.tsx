import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return <Main>{children}</Main>;
};

export default MainContainer;

const Main = styled.main`
  margin-bottom: 80px;
`;
