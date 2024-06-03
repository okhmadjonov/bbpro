import { LocaleStringsInterface } from "@/Components/Types";

export interface ServicesData {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
