import React, { useState } from "react";
import "react-vertical-timeline-component/style.min.css";
import styles from "./Timeline.module.scss";
import Image from "next/image";

const timelineData = [
  {
    text: "1) Сбор информации",
    link: {
      url: "https://github.com/florinpop17/app-ideas",
      text: "Check it out here",
    },
  },
  {
    text: "2) Создание структуры и карты сайта",
    link: {
      url: "https://florin-pop/blog/2019/03/weekly-coding-challenge/",
      text: "Check it out here",
    },
  },
  {
    text: "3) Разработка дизайна",

    link: {
      url: "https://twitter.com/florinpop1705",
      text: "Check it out here",
    },
  },
  {
    text: "4) Узнаваемость бренда",
    link: {
      url: "https://medium.freecodecamp.org/how-to-build-a-double-slider-sign-in-and-sign-up-form-6a5d03612a34",
      text: "Check it out here",
    },
  },
  {
    text: "5) Тестирование и запуск",
    link: {
      url: "https://medium.com/@popflorin1705",
      text: "Check it out here",
    },
  },
];

const TimelineItem = ({ data }: any) => (
  <div className={styles.timelineitem}>
    <div className={styles.timelineitemcontent}>
      <p>{data.text}</p>
      {data.link && (
        <a href={data.link.url} target="_blank" rel="noopener noreferrer">
          {data.link.text}
        </a>
      )}
      <span className={styles.circle} />
    </div>
  </div>
);

const Timeline = () =>
  timelineData.length > 0 && (
    <div className={styles.timelinecontainer}>
      <h1>Этапы наших работ</h1>
      <br />
      {timelineData.map((data, idx) => (
        <TimelineItem data={data} key={idx} />
      ))}
    </div>
  );

export default Timeline;
