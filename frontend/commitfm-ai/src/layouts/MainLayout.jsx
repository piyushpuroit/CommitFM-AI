import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children, hideFooter = false }) => {
    return (
    <div className={`bg-indigo-950 text-slate-100 overflow-x-hidden ${hideFooter ? "h-auto md:h-screen flex flex-col overflow-y-auto md:overflow-hidden min-h-screen" : "min-h-screen"}`}>
      <div className="w-full flex-1 flex flex-col min-h-0">
        <Navbar />

        <div className={`max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 flex-1 min-h-0 flex flex-col w-full ${hideFooter ? "pb-3 sm:pb-4 lg:pb-5" : "py-2 sm:py-4 lg:py-5"}`}>
          {/* Main Content */}
          {children}

          {!hideFooter && <Footer />}
        </div>
      </div>
    </div>
    );
};

export default MainLayout;
