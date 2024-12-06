import React from "react";
import Header from "../landingPage/Header";
import Footer from "../landingPage/Footer";

const MainLayout = ({ children, footerBgColor }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer bgColor={footerBgColor} />
    </>
  );
};

export default MainLayout;
