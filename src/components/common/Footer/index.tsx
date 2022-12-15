import styled from '@emotion/styled';
import Link from '~/components/base/Link';
import PageContainer from '../PageContainer';
import Logo from '../Logo';

const Footer = () => {
  return (
    <FooterContainer>
      <Inner>
        <LogoArea>
          <Logo type="text" />
          <SuggestionButton href="/suggestion" size="xs" variant="gray">
            건의하기
          </SuggestionButton>
        </LogoArea>
        <Copyright> Copyright © developerwiki. All rights reserved.</Copyright>
      </Inner>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const Inner = styled(PageContainer)`
  padding-top: 55px;
  padding-bottom: 65px;
`;

const SuggestionButton = styled(Link)`
  margin-left: 12px;

  &::before {
    content: '💌 ';
  }
  &:hover::before {
    content: '🙇‍♀️ ';
  }
`;

const Copyright = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray500};
  ${({ theme }) => theme.fontStyle.caption};
`;

const LogoArea = styled.div`
  display: flex;
`;
