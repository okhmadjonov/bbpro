import { IntlProvider } from "next-intl";
import React from "react";
import ru from "../translate/ru.json";
import en from "../translate/en.json";
import uz from "../translate/uz.json";
import { useRouter } from "next/router";

interface IntlWrapperProviderProps {
  children: React.ReactNode;
}

const IntlWrapperProvider = ({ children }: IntlWrapperProviderProps) => {
  const router = useRouter();
  const { locale } = router;
  const defaultLocale = "ru";

  const currentLocale = locale || defaultLocale;

  const messages =
    currentLocale === "ru" ? ru : currentLocale === "uz" ? uz : en;

  return (
    <IntlProvider messages={messages} locale={defaultLocale}>
      {children}
    </IntlProvider>
  );
};

export default IntlWrapperProvider;
