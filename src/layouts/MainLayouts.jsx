import { Outlet, useLoaderData } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { Suspense } from "react";
import Loading from "../components/Loading";

const MainLayouts = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Header />
      <main className="w-11/12 mx-auto flex-1 pt-4" style={{ minHeight: "calc(100vh - 134px)" }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayouts;
