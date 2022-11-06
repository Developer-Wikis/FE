import { isBrowser } from '~/utils/helper/checkType';

export const isMobileWeb = () => {
  if (!isBrowser()) return false;

  if (
    navigator.userAgent.match(/ipad|iphone/i) !== null ||
    navigator.userAgent.match(/Android/i) !== null
  ) {
    return true;
  }
  return false;
};
