export const URL_MAP = {
  home: "/",

  aboutFoundation: {
    index: '/pro-fond',
    ourWork: '/pro-fond#ourWork',
    team: '/pro-fond#team',
    docs: '/pro-fond#docs',
  },

  donate: '/dopomoha',

  needHelp: '/potrebuiu-dopomohy',
  news: '/novyny',
  contacts: '/contacts',

  newsPost: (slug = ':slug') => `/novyna/${slug}` 
};

// SIZE BREAKPOINTS
export const BREAKPOINT_PHONE = 576;
export const BREAKPOINT_LANDSCAPE = 768;
export const BREAKPOINT_TABLET = 1024;
export const BREAKPOINT_IPAD = 1280;
export const BREAKPOINT_LAPTOP = 1440;


export const CONTACT_PHONE = '+380 50 352 23 24'
export const CONTACT_MAIL = 'info@svfoundation.org.ua'
export const CONTACT_FACEBOOK = ''