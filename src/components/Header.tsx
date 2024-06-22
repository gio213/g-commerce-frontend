import { useAppContext } from "@/context/AppContext";
import MainMenu from "./MainMenu";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Header = () => {
  const { user, isLoggedin } = useAppContext();
  const navigate = useNavigate();
  return (
    <header className="shadow-2xl bg-white-800">
      <div className="container flex items-center justify-between mx-auto">
        <div>
          <Link to="/">
            <img
              src={logoImg}
              alt="logo "
              width={100}
              height={100}
              className=""
            />
          </Link>
        </div>

        <NavLinks />
        <input placeholder="Search" className="input input-bordered" />
        {isLoggedin && user?.role === "admin" && (
          <Button
            onClick={() => {
              navigate("/admin-dashboard");
            }}
          >
            Admin Dashboard
          </Button>
        )}
        <MainMenu />

        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
