import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { theme } from '~/types/theme';

interface PageDescriptionProps {
  children: ReactNode;
  textType?: 'normal' | 'bold';
}
const PageDescription = ({ children, textType = 'normal' }: PageDescriptionProps) => {
  return <StyledP textType={textType}>{children}</StyledP>;
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
  ${({ textType }) => textType && fontStyle[textType]}
  text-align: center;
  margin-top: 14px;
`;

export default PageDescription;
