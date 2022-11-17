import { useEffect, useState } from 'react';
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

const Login = () => {
  const router = useRouter();
  const [googleUrl, setGoogleUrl] = useState('');
  const { login } = useAuth();

  const requestLogin = async (code: string) => {
    try {
      const redirectUrl = `${window.location.origin}/login`;
      login(code, redirectUrl);
      router.push('/');
    } catch (e) {
      alert('로그인에 실패했습니다.');
      router.push('/login');
    }
  };

  const requestGoogleLink = async () => {
    const redirectUrl = `${window.location.origin}/login`;
    const res = await oauthApi.getGoogleLink(redirectUrl);

    setGoogleUrl(res.data);
  };

  const onClickGoogleLogin = () => {
    if (googleUrl.length === 0) {
      alert('로그인 연결에 실패했습니다.');
    }
  };

  useEffect(() => {
    requestGoogleLink();
  }, []);

  useEffect(() => {
    const { code } = router.query;

    if (code && isString(code)) {
      requestLogin(code);
    }
  }, [router.query]);

  return (
    <Article>
      <PageTitle>로그인</PageTitle>
      <PageDescription textType="bold">developerwiki에 오신 것을 환영합니다!</PageDescription>
      <LogoArea>
        <Icon name="LogoIcon" size="110" />
      </LogoArea>
      <SocialButtons>
        <SocialLink linkType="borderGray" size="lg" href={googleUrl} onClick={onClickGoogleLogin}>
          <Icon name="Google" />
          <span>구글 계정으로 계속하기</span>
        </SocialLink>
      </SocialButtons>
    </Article>
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
