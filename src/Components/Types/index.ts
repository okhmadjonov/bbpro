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

export interface NewListInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
}

export interface NewsListResponseInterface {
  data: NewListInterface[];
  totalItems: number;
  itemsPerPage: number;
  pageIndex: number;
  totalPages: number;
}
//Projects
export interface ProjectListInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
}
export interface ProjectsListResponseInterface {
  data: ProjectListInterface[];
  totalItems: number;
  itemsPerPage: number;
  pageIndex: number;
  totalPages: number;
}

//Services
export interface ServiceListInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface NewServicesCardProps {
  description: LocaleStringsInterface;
  title: LocaleStringsInterface;
  id: number;
  index: number;
  imageUrl: string;
}

export interface ServicesListResponseInterface {
  data: ServiceListInterface[];
  totalItems: number;
  itemsPerPage: number;
  pageIndex: number;
  totalPages: number;
}
export interface NewServicesItemInterface {
  items: ServiceListInterface[];
}
export interface NewCardProps {
  data: NewListInterface;
  index: number;
  locale: string;
}

export interface ProjectCardProps {
  data: ProjectListInterface;
  index: number;
  locale: string;
}
export interface ServiceCardProps {
  data: ServiceListInterface;
  index: number;
  locale: string;
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

export interface ServicesInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

// About

export interface AboutInterface {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface OrderModalInterface {
  id: number;
  Name: string;
  Phone: string;
  Email: string;
  Message: string;
}
