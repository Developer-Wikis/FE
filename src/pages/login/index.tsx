import { useEffect, useRef, useState } from 'react';
import Link from '~/components/base/Link';
import { useRouter } from 'next/router';
import oauthApi from '~/service/oauth';
import { isString } from '~/utils/helper/checkType';
import Article from '~/components/common/Article';
import PageTitle from '~/components/base/PageTitle';
import PageDescription from '~/components/common/PageDescription';
import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';
import { useAuth } from '~/react-query/hooks/useAuth';
import SEO from '~/components/common/SEO';

const Login = () => {
  const router = useRouter();
  const [googleUrl, setGoogleUrl] = useState('');
  const { login } = useAuth();
  const redirectUrl = useRef('');

  const requestGoogleLink = async () => {
    const res = await oauthApi.getGoogleLink(redirectUrl.current);
    setGoogleUrl(res.data);
  };

  const onClickGoogleLogin = () => {
    if (googleUrl.length === 0) {
      alert('로그인 연결에 실패했습니다.');
    }
  };

  useEffect(() => {
    redirectUrl.current = `${window.location.origin}/login`;
    requestGoogleLink();
  }, []);

  useEffect(() => {
    const { code } = router.query;

    if (code && isString(code)) {
      login(code, redirectUrl.current);
    }
  }, [router.query]);

  return (
    <>
      <SEO title="로그인" withSuffix />
      <Article>
        <PageTitle>로그인</PageTitle>
        <PageDescription textType="bold">developerwiki에 오신 것을 환영합니다!</PageDescription>
        <LogoArea>
          <Icon name="LogoIcon" size="110" />
        </LogoArea>
        <SocialButtons>
          <SocialLink variant="borderGray" size="lg" href={googleUrl} onClick={onClickGoogleLogin}>
            <Icon name="Google" />
            <span>구글 계정으로 계속하기</span>
          </SocialLink>
        </SocialButtons>
      </Article>
    </>
  );
};

export default Login;

const SocialButtons = styled.div`
  margin-top: 35px;
`;

const SocialLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 4px;
  }
`;

const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;
