import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 mb-6">
      <div className="max-w-7xl mx-auto px-2">
        <div className="backdrop-blur-md bg-white/6 border border-white/8 rounded-xl px-4 py-3 flex items-center justify-between shadow-md">
          <Link to="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400">CommitFM</Link>
          <div className="flex items-center gap-4">
            <NavLink to="/dashboard" className={({ isActive }) => `text-xs sm:text-sm transition ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}>Dashboard</NavLink>
            <NavLink to="/repositories" className={({ isActive }) => `text-xs sm:text-sm transition ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}>Repositories</NavLink>
            <NavLink to="/dna" className={({ isActive }) => `text-xs sm:text-sm transition ${isActive ? "text-brand-accent font-bold" : "text-zinc-300 hover:text-white"}`}>Developer DNA</NavLink>
            <Link to="/connect" className="ml-4 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white shadow-sm text-xs sm:text-sm font-medium">Connect GitHub</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
