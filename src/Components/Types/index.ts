import { StaticImageData } from "next/image";

export interface LocaleStringsInterface {
  uz: string;
  ru: string;
  en: string;
}

export interface IGoToBackObject {
  title?: string;
  path?: string;
  titleNotr?: string;
}

export interface IGoToBack {
  pathArr: IGoToBackObject[];
  styles?: { color: string };
}

export interface SliderSwipesProps {
  prevEl: string;
  nextEl: string;
}

export interface OurTeamListItemInterface {
  id: number;
  imageUrl: StaticImageData;
  fullname: string;
  position: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface AboutSliderItemInterface {
  id: number;
  imageUrl: string;
}

export interface ContactPageInterface {
  id: number;
  map: string;
  address: LocaleStringsInterface;
  workTime: LocaleStringsInterface;
  phone: string[];
  email: string;
}

export interface locationItemsInterface {
  id: number;
  mapFrame: string;
  address: LocaleStringsInterface;
  phone: string[];
  email: string;
  workDay: LocaleStringsInterface;
  weekend: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface ProductGetOneInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface headerDataInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface headerDataFakeInterface {
  imageUrl: StaticImageData;
  title: string;
  description: string;
}

export interface NewProductsInterface {
  items: NewProductsItemInterface[];
  totalItems: number;
  itemsPerPage: number;
  currentItemCount: number;
  pageIndex: number;
}

export interface NewProductsItemInterface {
  title: LocaleStringsInterface;
  id: number;
  description: LocaleStringsInterface;
  imageUrl: any;
}

export interface PageTitleProps {
  title?: string;
}

export interface SelectedDataInterface {
  type: string;
  data?: any;
  method?: "PUT" | "POST" | "GET";
  name?: string;
}
export type IUser = {
  user: {
    status: boolean;
    token: string;
  };
  token: string;
};

export interface ICustomError {
  id: string;
  error: string;
  message: string;
}

export interface HomeBannerInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
export interface WhyBBPInterface {
  id: number;
  content: string;
}

export interface NewListInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  subTitle: LocaleStringsInterface;
}

export interface NewsListResponseInterface {
  items: NewListInterface[];
  totalItems: number;
  itemsPerPage: number;
  pageIndex: number;
  totalPages: number;
}

export interface NewCardProps {
  data: NewListInterface;
  index: number;
  locale: string;
}

export interface AboutUsInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  subDescription: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInterface {
  id: number;
  title: string;
  mapFrame: string;
  address: LocaleStringsInterface;
  phone: string[];
  email: string;
  workDay: LocaleStringsInterface;
  weekend: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
export interface ServiceInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  subDescription: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
export interface NewsInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
