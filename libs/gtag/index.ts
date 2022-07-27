const GA = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export const pageview = (url: string): void => {
  if (GA)
    window.gtag("config", GA, {
      page_path: url,
    });
};
