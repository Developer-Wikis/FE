import styled from '@emotion/styled';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import { buttonSizes, buttonStyle } from './Button/types';

type LinkTypes = { variant?: keyof typeof buttonStyle; size?: keyof typeof buttonSizes };
type LinkProps = Omit<NextLinkProps, 'passHref'> & {
  children: ReactNode;
  className?: string;
} & LinkTypes;

const Link = ({
  variant,
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
      <StyledA variant={variant} size={size} onClick={onClick} className={className}>
        {children}
      </StyledA>
    </NextLink>
  );
};

export default Link;

const StyledA = styled.a<LinkTypes>`
  ${({ variant }) => variant && buttonStyle[variant]};
  ${({ size, variant }) => (size || variant) && `display: inline-block;`};
  ${({ size }) => size && buttonSizes[size]};
`;
