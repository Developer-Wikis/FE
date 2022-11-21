import styled from '@emotion/styled';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import { buttonSizes, buttonStyle } from './Button/types';

type LinkTypes = { linkType?: keyof typeof buttonStyle; size?: keyof typeof buttonSizes };
type LinkProps = Omit<NextLinkProps, 'passHref'> & {
  children: ReactNode;
  className?: string;
} & LinkTypes;

const Link = ({
  linkType,
  size,
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  children,
  onClick,
  className,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      prefetch={prefetch}
      passHref
      {...props}
    >
      <StyledA linkType={linkType} size={size} onClick={onClick} className={className}>
        {children}
      </StyledA>
    </NextLink>
  );
};

export default Link;

const StyledA = styled.a<LinkTypes>`
  ${({ linkType }) => linkType && buttonStyle[linkType]};
  ${({ size, linkType }) => (size || linkType) && `display: inline-block;`};
  ${({ size }) => size && buttonSizes[size]};
`;
