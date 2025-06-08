import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayouts = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main style={{ minHeight: "calc(100vh - 134px)" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayouts;
