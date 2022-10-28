import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { theme } from '~/types/theme';

interface PageDescriptionProps {
  children: ReactNode;
  type?: 'normal' | 'bold';
}
const PageDescription = ({ children, type = 'normal' }: PageDescriptionProps) => {
  return <StyledP type={type}>{children}</StyledP>;
};

const fontStyle = {
  normal: `
    color: ${theme.colors.gray600};
    ${theme.fontStyle.body2}
  `,
  bold: `
  color: ${theme.colors.gray800};
  ${theme.fontStyle.body1};
  font-weight: 600;
  `,
};

const StyledP = styled.p<PageDescriptionProps>`
  ${({ type }) => type && fontStyle[type]}
  text-align: center;
  margin-top: 14px;
`;

export default PageDescription;
