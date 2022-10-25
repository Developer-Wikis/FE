export const GTM_ID = process.env.GTM_ID;

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
