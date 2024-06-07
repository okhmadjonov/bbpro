import { LocaleStringsInterface } from "@/Components/Types";

export interface ChallengeData {
  id: number;
  imageUrl: string;
  title: LocaleStringsInterface;
  description: LocaleStringsInterface;
  createdAt: string;
  updatedAt: string;
}
