import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children, hideFooter = false }) => {
    return (
    <div className={`bg-indigo-950 text-slate-100 ${hideFooter ? "h-screen flex flex-col overflow-hidden" : "min-h-screen"}`}>
      <div className="w-full flex-1 flex flex-col min-h-0">
        <Navbar />

        <div className={`max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 min-h-0 flex flex-col w-full ${hideFooter ? "pb-4 sm:pb-5 lg:pb-6" : "py-3.5 sm:py-5 lg:py-7"}`}>
          {/* Main Content */}
          {children}

          {!hideFooter && <Footer />}
        </div>
      </div>
    </div>
    );
};

export default MainLayout;
