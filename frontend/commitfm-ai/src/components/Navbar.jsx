import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-4 z-50 mb-6">
      <div className="max-w-[1600px] mx-auto px-2">
        <div className="backdrop-blur-md bg-white/6 border border-white/8 rounded-xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between shadow-md gap-3 md:gap-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400 select-none">
              CommitFM
            </Link>
            
            {/* Hamburger button for mobile */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 md:hidden rounded-premium hover:bg-white/5 text-zinc-300 hover:text-white transition cursor-pointer shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-stretch md:items-center gap-3.5 md:gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-3 md:pt-0`}>
            <NavLink 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-xs sm:text-sm font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/repositories" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-xs sm:text-sm font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Repositories
            </NavLink>
            <NavLink 
              to="/dna" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-xs sm:text-sm font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Developer DNA
            </NavLink>
            <Link 
              to="/connect" 
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white shadow-sm text-xs sm:text-sm font-semibold text-center hover:opacity-90 transition"
            >
              Connect GitHub
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
