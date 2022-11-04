import { unauth } from './base';

// 응답값 확정되면 수정해서 적용 예정
interface LoginResponse {
  jwtToken: string;
  refreshToken: string;
  tokenType: string;
  userEmail: string;
  userName: string;
}

export const googleLogin = ({ code, redirectUrl }: { code: string; redirectUrl: string }) => {
  return unauth.get(`/oauth/google/userinfo`, { params: { code, redirectUrl } });
};

export const getGoogleLink = (url: string) => {
  return unauth.get(`/oauth/google`, { params: { url } });
};
