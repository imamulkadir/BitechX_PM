const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] text-[var(--text-white)] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Company Info */}
        <div className="text-center md:text-left flex flex-col gap-2">
          <img
            src="https://www.bitechx.com/icons/logo.svg"
            className="w-10"
            alt="logo"
          />
          <h2 className="font-bold text-lg">BiTechX llc</h2>
          <p className="text-sm text-[var(--text-white)]/70">
            &copy; {new Date().getFullYear()} BiTechX LLC 2025. All rights
            reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <a
            href="/home"
            className="hover:text-[var(--brown)] transition-colors"
          >
            Home
          </a>
          <a
            href="/products"
            className="hover:text-[var(--brown)] transition-colors"
          >
            Products
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
