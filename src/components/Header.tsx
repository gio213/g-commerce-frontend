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
    <header className="shadow-2xl ">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logoImg}
              alt="logo"
              width={100}
              height={100}
              className="mr-4"
            />
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center space-x-4">
          <input
            placeholder="Search"
            className="px-4 py-2 rounded-lg input input-bordered"
          />
          {isLoggedin && user?.role === "admin" && (
            <Button
              className="hidden font-bold md:block"
              variant={"ghost"}
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
      </div>
    </header>
  );
};

export default Header;
