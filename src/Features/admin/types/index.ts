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
