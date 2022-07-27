import getCheckCountry from "api/getCheckCountry";
import { i18n } from "next-i18next.config";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const KEY_DETECTED_LOCALE = "detectedLocale";

export async function middleware(req: NextRequest, res: NextResponse) {
  if (
    !req.nextUrl.pathname.includes("/api/") &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    const hasDetectedLocale = !!req.cookies.get(KEY_DETECTED_LOCALE);

    if (!hasDetectedLocale) {
      const detectedLocale = (await getCheckCountry()).data?.language;
      const needToChangeLocale =
        detectedLocale &&
        req.nextUrl.locale !== detectedLocale &&
        i18n.locales.includes(detectedLocale);

      const res = needToChangeLocale
        ? NextResponse.redirect(
            new URL(`/${detectedLocale}${req.nextUrl.pathname}`, req.url)
          )
        : NextResponse.next();

      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      res.cookies.set(KEY_DETECTED_LOCALE, detectedLocale, {
        expires: nextWeek,
      });

      return res;
    }
  }
}
