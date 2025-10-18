const HomePage = () => {
  return (
    <div
      className="max-w-7xl mx-auto flex flex-col justify-center items-center px-4 text-center space-y-6 font-open"
      style={{ minHeight: "calc(100vh - 263px)" }}
    >
      {/* Hero Text with gradient accent */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--primary)] bg-gradient-to-r from-[var(--primary)] to-[var(--brown)] bg-clip-text text-transparent">
        Welcome to BitechX
      </h1>

      {/* Subtitle */}
      <p className="text-2xl sm:text-3xl text-[var(--text-muted)] font-semibold animate-fadeIn">
        Product Management System
      </p>

      {/* Description Box */}
      <div className="max-w-xl bg-[var(--primary)]/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg space-y-4">
        <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          Manage your products effortlessly with{" "}
          <a
            href="https://www.bitechx.com/"
            className="text-[var(--brown)] font-bold underline decoration-[var(--brown)] decoration-2 hover:decoration-4 transition-all"
            target="_blank"
          >
            BitechX LLC
          </a>
          ’s Product Management System. You can <strong>add</strong> new
          products, <strong>view</strong> existing ones, <strong>update</strong>{" "}
          product details, or <strong>delete</strong> them as needed.
        </p>
        <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
          The system also supports <strong>pagination</strong> for easier
          browsing of large inventories and ensures smooth, responsive
          navigation for a seamless user experience.
        </p>
      </div>

      {/* Call to Action */}
      <a
        href="/products"
        className="mt-4 inline-block bg-[var(--brown)] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
      >
        Get Started
      </a>
    </div>
  );
};

export default HomePage;
