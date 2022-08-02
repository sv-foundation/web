export const URL_MAP = {
  home: "/",

  aboutFoundation: {
    index: "/pro-fond",
    ourWork: "/pro-fond#ourWork",
    team: "/pro-fond#team",
    docs: "/pro-fond#docs",
  },

  donate: "/dopomoha",

  needHelp: "/potrebuiu-dopomohy",
  news: "/novyny",
  contacts: "/contacts",

  newsPost: (slug = ":slug") => `/novyna/${slug}`,
};

// SIZE BREAKPOINTS
export const BREAKPOINT_PHONE = 576;
export const BREAKPOINT_LANDSCAPE = 768;
export const BREAKPOINT_TABLET = 1024;
export const BREAKPOINT_IPAD = 1280;
export const BREAKPOINT_LAPTOP = 1440;

export const CONTACT_PHONE = "+380 50 352 23 24";
export const CONTACT_MAIL = "info@svfoundation.org.ua";
export const CONTACT_FACEBOOK = "https://www.facebook.com/svfoundation.org.ua";

export const CRYPTO_ADDRESS_TRX20 = "TY3Gv1HhCxFxbp6thiJ1zYuZZqhjDai8Lh";
export const CRYPTO_ADDRESS_ERC20 =
  "0xC7dB62F046a125dc536B4F3d5F2B6aB3f9eBcF09";
export const CRYPTO_ADDRESS_BTC = "bc1qamyw9320qd6eukxnglpfjadwr8f8d40hyr23yn";
