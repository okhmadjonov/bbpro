import React, { ReactNode, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import AOS from "aos";
import { useRouter } from "next/router";
import AdminLayout from "../AdminLayout";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "aos/dist/aos.css";
import { API, axiosHeadersSetToken } from "@/services/api";

interface ILayoutsProps {
  children: ReactNode;
}

const MainLayout = ({ children }: ILayoutsProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    const checkSessionExpiration = async () => {
      if (session?.expires) {
        const currentTime = new Date();
        const expirationTime = new Date(session.expires);
        if (currentTime >= expirationTime) {
          await signOut({ redirect: false });
          if (router.pathname.includes("admin")) {
            router.push("/login");
          }
        }
      }
    };

    checkSessionExpiration();
  }, [session, router]);

  if (router.pathname.includes("login")) {
    return children;
  }

  if (router.pathname.includes("admin")) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <>
      <Navbar
       
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
