import MainMenu from "./MainMenu";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="bg-white-800 shadow-2xl">
      <div className="container flex justify-between  mx-auto py-4">
        <div>
          <h1>Logo</h1>
        </div>

        <NavLinks />
        <input placeholder="Search" className="input input-bordered" />
        <MainMenu />

        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
