// src/utils/intlWrapperProvider.tsx
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
  const locale = router.locale || "ru";
  const messages = locale === "uz" ? uz : locale === "ru" ? ru : en;

  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  );
};

export default IntlWrapperProvider;
