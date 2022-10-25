import { isProduction } from '~/utils/helper/checkType';

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
