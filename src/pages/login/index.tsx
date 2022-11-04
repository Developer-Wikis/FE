import { useContext, useEffect, useRef, useState } from 'react';
import Link from '~/components/base/Link';
import { useRouter } from 'next/router';
import { getGoogleLink, googleLogin } from '~/service/oauth';
import { isString } from '~/utils/helper/checkType';
import Article from '~/components/common/Article';
import PageTitle from '~/components/base/PageTitle';
import PageDescription from '~/components/common/PageDescription';
import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';
import { UserContext } from '~/context/user';

const Login = () => {
  const router = useRouter();
  const [googleUrl, setGoogleUrl] = useState('');
  const { setToken } = useContext(UserContext);

  const requestLogin = async (code: string) => {
    try {
      const res = await googleLogin({ code, redirectUrl: `${window.location.origin}/login` });
      setToken({ token: res.data.jwtToken, refreshToken: res.data.refreshToken });
      router.push('/');
    } catch (e) {
      alert('로그인에 실패했습니다.');
      router.push('/login');
    }
  };

  const requestGoogleLink = async () => {
    const redirectUrl = `${window.location.origin}/login`;
    const res = await getGoogleLink(redirectUrl);

    setGoogleUrl(res.data);
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
        <SocialLink linkType="borderGray" size="lg" href={googleUrl}>
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
