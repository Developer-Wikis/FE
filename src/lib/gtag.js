export const GA_TRACKING_ID = process.env.GA_ID;

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, { path_path: url });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
