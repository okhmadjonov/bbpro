import { DefaultSession } from "next-auth";
import { IUser } from "./src/Components/Types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: IUser;
    token: string;
  }
  interface User extends DefaultUser {
    id: string;
    error: string;
    message: string;
  }
}
