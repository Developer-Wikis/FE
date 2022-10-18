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
  ${({ theme }) => theme.fontStyle.headline1};
  text-align: ${({ align }) => align};
`;
