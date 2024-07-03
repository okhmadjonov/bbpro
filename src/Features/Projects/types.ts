import { LocaleStringsInterface } from "@/Components/Types";

export interface ProjectsData {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  downloadLink: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
