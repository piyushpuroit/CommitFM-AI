import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
    return (
    <div className="min-h-screen bg-indigo-950 text-slate-100">
      <div className="w-full">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-7">
          {/* Main Content */}
          {children}

          <Footer />
        </div>
      </div>
    </div>
    );
};

export default MainLayout;
