import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["en", "fr", "ar", "es", "de", "ja"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value as Locale | undefined;

  const locale: Locale = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
