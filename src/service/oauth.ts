import { unauth } from './base';

// 응답값 확정되면 수정해서 적용 예정
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  email: string;
  username: string;
}

const oauthApi = {
  googleLogin: ({ code, redirectUrl }: { code: string; redirectUrl: string }) => {
    return unauth.get(`/oauth/google/userinfo`, { params: { code, redirectUrl } });
  },
  getGoogleLink: (url: string) => {
    return unauth.get(`/oauth/google`, { params: { url } });
  },
};

export default oauthApi;
