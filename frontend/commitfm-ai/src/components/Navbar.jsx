const Navbar = () => {
  return (
    <nav className="sticky top-4 z-50 mb-6">
      <div className="max-w-7xl mx-auto px-2">
        <div className="backdrop-blur-md bg-white/6 border border-white/8 rounded-xl px-4 py-3 flex items-center justify-between shadow-md">
          <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-400">CommitFM</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-zinc-300 hover:text-white transition">Features</a>
            <a href="#dashboard" className="text-zinc-300 hover:text-white transition">Dashboard</a>
            <a href="#analytics" className="text-zinc-300 hover:text-white transition">Analytics</a>
            <a href="#login" className="ml-4 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md text-white shadow-sm">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
