const HomePage = () => {
  return (
    <div
      className="max-w-7xl mx-auto flex flex-col justify-center items-center px-4 text-center space-y-6 font-open"
      style={{ minHeight: "calc(100vh - 263px)" }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-[var(--primary)]">
        Welcome to BitechX
      </h1>
      <p className="text-2xl sm:text-3xl text-[var(--text-muted)]">
        Product Management System
      </p>
      <p className="max-w-xl text-[var(--text-muted)] text-base sm:text-lg">
        Manage your products effortlessly with{" "}
        <a
          href="https://www.bitechx.com/"
          className="text-[var(--brown)] font-bold"
        >
          BitechX LLC
        </a>{" "}
        ’s Product Management System. You can <strong>add</strong> new products,{" "}
        <strong>view</strong> existing ones,
        <strong> update</strong> product details, or <strong>delete</strong>{" "}
        them as needed. The system also supports <strong>pagination</strong> for
        easier browsing of large inventories and ensures smooth, responsive
        navigation for a seamless user experience.
      </p>
    </div>
  );
};

export default HomePage;
