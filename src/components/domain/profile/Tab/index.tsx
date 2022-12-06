import styled from '@emotion/styled';
import Link from '~/components/base/Link';

export type TTab = 'bookmark' | 'comment';
interface Tab {
  tab: TTab;
  onChange: (value: TTab) => void;
}

const Tab = ({ tab, onChange, ...props }: Tab) => {
  const getClassName = (linkTab: TTab) => (tab === linkTab ? 'is-active' : undefined);

  return (
    <StyledNav {...props}>
      <StyledUl>
        <li>
          <StyledLink
            href={{ pathname: `/profile`, query: { tab: 'bookmark' } }}
            as={`/profile`}
            size="lg"
            className={getClassName('bookmark')}
            onClick={() => onChange('bookmark')}
          >
            북마크한 질문 {0}
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href={{ pathname: `/profile`, query: { tab: 'comment' } }}
            size="lg"
            className={getClassName('comment')}
            onClick={() => onChange('comment')}
          >
            작성한 댓글 {0}
          </StyledLink>
        </li>
      </StyledUl>
    </StyledNav>
  );
};

export default Tab;

const StyledNav = styled.nav`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const StyledUl = styled.ul`
  display: flex;
`;

const StyledLink = styled(Link)`
  position: relative;
  color: ${({ theme }) => theme.colors.gray600};
  ${({ theme }) => theme.fontStyle.subtitle1}

  &.is-active {
    color: ${({ theme }) => theme.colors.gray800};

    ::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.red};
    }
  }
`;
