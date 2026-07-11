const Footer = () => {
    return (
        <footer className="py-4 sm:py-5 text-slate-500 text-xs border-t border-indigo-700/20">
            © {new Date().getFullYear()} CommitFM. All rights reserved.
        </footer>
    );
};

export default Footer;
