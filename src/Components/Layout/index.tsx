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
  catalogCategory: any;
}

const MainLayout = ({ children, catalogCategory }: ILayoutsProps) => {
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
        catalogCategory={catalogCategory}
        initialDataId={catalogCategory?.[0]?.id}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);

    const servicesListResponse = await API.getSolutionsList();

    const catalogCategoryResponse = await API.getCatalogCategory()
      .then((res: any) => {
        return res.data;
      })

      .catch((error: any) => {
        return { data: [] };
      });

    return {
      props: {
        servicelist: servicesListResponse.data || [],
        catalogCategory: catalogCategoryResponse.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        servicelist: [],
        catalogCategory: [],
      },
    };
  }
};
