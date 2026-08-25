import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useRepository } from "../contexts/RepositoryContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, login } = useRepository();

  const handleConnect = () => {
    setIsOpen(false);
    login();
  };

  return (
    <nav className="sticky top-2 z-50 mb-3 sm:mb-4">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-3">
        <div className="backdrop-blur-md bg-white/6 border border-white/8 rounded-xl px-3 py-2.5 flex flex-col md:flex-row md:items-center justify-between shadow-md gap-2.5 md:gap-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400 select-none">
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
          <div className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-2.5 md:pt-0`}>
            <NavLink 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-[11px] font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/repositories" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-[11px] font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Repositories
            </NavLink>

            <NavLink 
              to="/compare" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-[11px] font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Compare
            </NavLink>

            <NavLink 
              to="/dna" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-[11px] font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              DNA
            </NavLink>

            <NavLink 
              to="/profile" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-[11px] font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Profile
            </NavLink>

            <NavLink 
              to="/settings" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-[11px] font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              Settings
            </NavLink>

            <NavLink 
              to="/search" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-[11px] font-semibold transition py-1 md:py-0 ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}
            >
              🔍 Search
            </NavLink>

            {user ? (
              <div className="flex items-center gap-2 justify-center md:justify-start border-t md:border-t-0 border-white/5 pt-2 md:pt-0">
                <Link to="/profile">
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-6 h-6 rounded-full border border-white/10 hover:border-brand-primary transition"
                      title={`${user.name} (@${user.login})`}
                    />
                  )}
                </Link>
                <div className="text-left hidden lg:block">
                  <div className="text-[10px] font-bold text-white leading-tight truncate max-w-[80px]">{user.name}</div>
                  <div className="text-[8px] text-brand-muted leading-tight truncate max-w-[80px]">@{user.login}</div>
                </div>
                <button
                  onClick={logout}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-brand-muted hover:text-white transition text-[10px] font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white shadow-sm text-xs font-semibold text-center hover:opacity-90 transition cursor-pointer"
              >
                Connect GitHub
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
