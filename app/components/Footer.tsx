const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] text-[var(--text-white)] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <img
            src="https://www.bitechx.com/icons/logo.svg"
            className="w-12 md:w-10"
            alt="BiTechX Logo"
          />
          <h2 className="font-bold text-lg">BiTechX LLC</h2>
          <p className="text-sm text-[var(--text-white)]/70">
            <a
              className="text-[var(--green)] hover:text-[var(--brown)] transition-colors font-semibold"
              href="https://www.linkedin.com/in/imamulkadir/"
              target="_blank"
            >
              Imamul Kadir
            </a>{" "}
            &copy; {new Date().getFullYear()} BiTechX LLC. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 md:gap-6 mt-4 md:mt-0">
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
          <a
            href="/categories"
            className="hover:text-[var(--brown)] transition-colors"
          >
            Categories
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
