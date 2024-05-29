import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

interface ILayoutsProps {
  children: ReactNode;
}

const MainLayout = ({ children }: ILayoutsProps) => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
