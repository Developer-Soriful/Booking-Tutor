import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { Suspense } from "react";
import Loading from "../components/Loading";

const MainLayouts = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main style={{ minHeight: "calc(100vh - 134px)" }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayouts;
