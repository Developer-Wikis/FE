import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

type LinkProps = Omit<NextLinkProps, 'as' | 'passHref'> & { children: ReactNode };

const Link = ({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  children,
  onClick,
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
      <a onClick={onClick}>{children}</a>
    </NextLink>
  );
};

export default Link;
