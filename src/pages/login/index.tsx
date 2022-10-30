import { objectToQuery } from '~/utils/helper/converter';
import { useContext, useEffect, useRef, useState } from 'react';
import Link from '~/components/base/Link';
import { useRouter } from 'next/router';
import { googleLogin } from '~/service/oauth';
import { isString } from '~/utils/helper/checkType';
import Article from '~/components/common/Article';
import PageTitle from '~/components/base/PageTitle';
import PageDescription from '~/components/common/PageDescription';
import styled from '@emotion/styled';
import Icon from '~/components/base/Icon';
import useStorage from '~/hooks/useStorage';
import { UserContext } from '~/context/user';
import { LOCAL_KEY } from '~/utils/constant/user';

const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';
const SCOPE =
  'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email ';

const Login = () => {
  const router = useRouter();
  const [googleUrl, setGoogleUrl] = useState('');
  const storage = useStorage('local');
  const { updateUser } = useContext(UserContext);

  const requestLogin = async (code: string) => {
    try {
      const res = await googleLogin({ code, redirectUrl: `${window.location.origin}/login` });
      storage.setItem(LOCAL_KEY.token, res.data.jwtToken);
      storage.setItem(LOCAL_KEY.refresh, res.data.refreshToken);
      router.push('/');
      updateUser({
        token: res.data.jwtToken,
        //응답 값 확정되면 수정 예정
        user: {
          email: res.data.userEmail || res.data.email,
          username: res.data.userName || res.data.username,
        },
      });
    } catch (e) {
      alert('로그인에 실패했습니다.');
      router.push('/login');
    }
  };

  useEffect(() => {
    const queryStr = objectToQuery({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}/login`,
      response_type: 'code',
      scope: SCOPE,
    });
    setGoogleUrl(AUTHORIZE_URI + '?' + queryStr);
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
      <PageDescription type="bold">developerwiki에 오신 것을 환영합니다!</PageDescription>
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
