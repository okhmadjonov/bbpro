import { LocaleStringsInterface } from "@/Components/Types";

export interface NewsData {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
