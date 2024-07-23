import React from "react";
import styles from "./ServiceDetails.module.scss";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LocaleStringsInterface } from "@/Components/Types";
import { BASE_URL } from "@/services/api";
import { ServicesData } from "../../types";
import { seo, responsive, secure, fast } from "@/Assets/Images";

interface Props {
  ssDetail: ServicesData;
}

const ServiceDetails = ({ ssDetail }: Props) => {
  const locale = useLocale();

  const formatDescription = (description: string) => {
    return description.replace(/\r\n/g, "<br />").replace(/\. /g, ".<br />");
  };

  const description =
    ssDetail.description[locale as keyof LocaleStringsInterface];
  const formattedDescription = formatDescription(description);

  return (
    <div className={styles.servicedetails}>
      {/*----------------------------- Web Development ------------------------ */}

      <div className={styles.webdevelopment}>
        <h2>Веб-разработка</h2>
        <p>
          <span>
            Разрабатываем интернет-проекты «под ключ». Наши сайты расскажут о
            сильных сторонах вашей компании. Агентство «Bbpro» поможет вашему
            бизнесу.
          </span>
        </p>
      </div>

      {/*-----------------------------  Features ------------------------ */}
      <div className={styles.features}>
        <div className={styles.features_item}>
          <div className={styles.ft_image}>
            <Image src={seo} alt="Seo" />
          </div>
          <p className={styles.ft_title}>Интеграция SEO</p>
          <p className={styles.ft_subtitle}>
            Создаем проекты, которые можно эффективно продвигать в поисковой
            выдаче. Обеспечиваем удержание пользователей на сайте и повышаем
            конверсию. Создаем сайты с учетом всех требований Google и Яндекса.
          </p>
        </div>
        <div className={styles.features_item}>
          <div className={styles.ft_image}>
            <Image src={responsive} alt="Responsive" />
          </div>
          <p className={styles.ft_title}>Адаптивность</p>
          <p className={styles.ft_subtitle}>
            Создаем ресурсы, которыми удобно пользоваться как на экранах
            десктопных компьютеров, так и на смартфонах. Используем адаптивную
            верстку, позволяющую комфортно работать с интернет-проектом на любом
            экране.
          </p>
        </div>
        <div className={styles.features_item}>
          <div className={styles.ft_image}>
            <Image src={secure} alt="Securre" />
          </div>
          <p className={styles.ft_title}>Безопасность</p>
          <p className={styles.ft_subtitle}>
            Оснащаем каждый проект, который у нас заказывают клиенты,
            современной защитой от взлома. Исправляем любые виды уязвимостей на
            этапе тестирования и запуска проекта. Гарантируем защиту от всех
            действующих угроз.
          </p>
        </div>
        <div className={styles.features_item}>
          <div className={styles.ft_image}>
            <Image src={fast} alt="Fast" />
          </div>
          <p className={styles.ft_title}>Скорость</p>
          <p className={styles.ft_subtitle}>
            Сегодня крайне важно, чтобы пользователь получал доступ к ресурсу в
            самые сжатые сроки. Используем легкий валидный код, позволяющий
            веб-ресурсу моментально загружаться на устройствах пользователей.
            Ваши клиенты не будут тратить лишние секунды на доступ к проекту.
          </p>
        </div>
      </div>

      <hr style={{ margin: "50px 0px" }} />
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${ssDetail.imageUrl}`}
        alt={ssDetail.title[locale as keyof LocaleStringsInterface]}
        width={1000}
        height={1000}
        priority
      />
      <div className={styles.details}>
        <h2>{ssDetail?.title[locale as keyof LocaleStringsInterface]}</h2>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: formattedDescription,
          }}
        ></p>
      </div>
    </div>
  );
};

export default ServiceDetails;
