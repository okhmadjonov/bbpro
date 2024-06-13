import React, { useState } from "react";
import styles from "./Faq.module.scss";
import Image from "next/image";
import { chevronDown } from "@/Assets/Images";

interface FaqItem {
  id: number;
  title: string;
  content: string;
}

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [data, setData] = useState<FaqItem[]>([
    {
      id: 1,
      title: "Расскажите, пожалуйста, подробнее о ценах на услуги?",
      content:
        "Подробная информация будет предоставлена ​​только через ответственного лица на рабочем месте.",
    },
    {
      id: 2,
      title:
        "Полная информация о офисных сетях и поставке оборудования, установке и обслуживании.",
      content:
        "Для таких услуг будет создана специальная мобильная команда, которая будет в распоряжении заказчика с нуля до завершения проекта.",
    },
    {
      id: 3,
      title:
        "На какой технологии или языке программирования создаются мобильные или веб-приложения?",
      content:
        "Мы можем построить на любом языке или технологии в зависимости от требований и предложений клиента.",
    },
    {
      id: 4,
      title: "Что нового в сфере безопасности?",
      content:
        "Наша команда состоит из высококвалифицированных специалистов, которые всегда предоставляют новейшие методы безопасности, соответствующие требованиям времени.",
    },
    {
      id: 5,
      title:
        "Например, я ничего не понимаю, мне нужно быстрое, безопасное, удобное веб-приложение.",
      content:
        "Мы вас понимаем, поэтому для клиентов мы готовим ваш заказ от нуля до максимума и подробно объясняем",
    },
  ]);

  const handleClick = (id: number) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className={styles.faq}>
      <div className={styles.left}>
        <h1>
          Часто задаваемые <br /> вопросы
        </h1>
      </div>
      <div className={styles.right}>
        <div className={styles.accordion}>
          {data.map((item) => (
            <div
              key={item.id}
              className={`${styles.accordion_item} ${
                open === item.id ? styles.active : ""
              }`}
            >
              <div
                className={styles.title}
                onClick={() => handleClick(item.id)}
              >
                <h1>{item.title}</h1>
                <Image src={chevronDown} alt="" />
              </div>
              <div
                className={`${styles.content} ${
                  open === item.id ? styles.active : ""
                }`}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
