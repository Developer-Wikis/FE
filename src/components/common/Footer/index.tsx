import styled from '@emotion/styled';
import Button from '~/components/base/Button';
import Link from '~/components/base/Link';
import PageContainer from '../PageContainer';

const Footer = () => {
  return (
    <FooterContainer>
      <Inner>
        <LogoArea>
          <Logo>developerwiki</Logo>
          <SuggestionButton href="/suggestion" size="xs" linkType="gray">
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
  padding: 55px 0 65px;
`;

const SuggestionButton = styled(Link)`
  margin-left: 12px;
`;

const Logo = styled.h4`
  font-size: 20px;
`;

const Copyright = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray500};
  ${({ theme }) => theme.fontStyle.caption};
`;

const LogoArea = styled.div`
  display: flex;
`;
