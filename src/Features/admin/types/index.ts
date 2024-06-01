import { LocaleStringsInterface } from "@/Components/Types";

export interface ColorInterface {
  colorsModel: {
    id?: number;
    key?: string;
    createdAt?: string;
    updatedAt?: string;
    images: ImageInterface[];
  };
}

interface ImageInterface {
  imagesFromColorModel: {
    id?: number;
    imagePath: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

interface TechCharacterInterface {
  id: number;
  key: LocaleStringsInterface;
  value: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDataInterface {
  id: number;
  isAvailable: boolean;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  subDescription: LocaleStringsInterface;
  applicationArea: LocaleStringsInterface;
  colors: ColorInterface[];
  techCharacterValueModels: TechCharacterInterface[];
  createdAt: string;
  updatedAt: string;
}
