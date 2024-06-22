import Footer from "@/components/Footer";
import Header from "@/components/Header";
import backgroundImage from "../assets/bg2.jpg";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <Header />

      <div className="container flex-1 py-10 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
