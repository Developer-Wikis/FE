import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  align?: 'center' | 'left' | 'right';
}

const PageTitle = ({ children, align = 'center', ...props }: PageTitleProps) => {
  return (
    <StyleH {...props} align={align}>
      {children}
    </StyleH>
  );
};

export default PageTitle;

const StyleH = styled.h3<PageTitleProps>`
  font-size: 24px;
  font-weight: 700;
  text-align: ${({ align }) => align};
`;