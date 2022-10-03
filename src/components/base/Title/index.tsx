import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children, ...props }: TitleProps) => {
  return <StyleH {...props}>{children}</StyleH>;
};

export default Title;

const StyleH = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;
