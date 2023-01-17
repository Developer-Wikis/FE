import useStorage from '~/hooks/useStorage';
import { LOCAL_KEY } from '~/utils/constant/user';
import { unauth } from './base';

const storage = useStorage('local');

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const getRefreshToken = async () => {
  try {
    const refresh = storage.getItem(LOCAL_KEY.refresh);
    const access = storage.getItem(LOCAL_KEY.token);
    const { data } = await unauth.post<RefreshResponse>('/refreshToken', {
      accessToken: access,
      refreshToken: refresh,
    });

    storage.setItem(LOCAL_KEY.token, data.accessToken);
    storage.setItem(LOCAL_KEY.refresh, data.refreshToken);

    return data.accessToken;
  } catch (e) {
    storage.removeItem(LOCAL_KEY.token);
    storage.removeItem(LOCAL_KEY.refresh);
  }
};

export default getRefreshToken;
