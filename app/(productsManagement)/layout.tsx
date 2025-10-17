import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ProductsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ProductsLayout;
