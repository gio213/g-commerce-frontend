import { useAppContext } from "@/context/AppContext";
import MainMenu from "./MainMenu";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  return (
    <header className="shadow-2xl bg-white-800">
      <div className="container flex justify-between py-4 mx-auto">
        <div>
          <h1>Logo</h1>
        </div>

        <NavLinks />
        <input placeholder="Search" className="input input-bordered" />
        {user?.role === "admin" && (
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
