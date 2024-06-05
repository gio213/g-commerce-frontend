import { navItems } from "@/constants";
import { Link } from "react-router-dom";
const NavLinks = () => {
  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="hidden md:flex  justify-center items-center"
        >
          <Link
            key={index}
            to={item.path}
            className="font-bold hover:text-orange-500"
          >
            {item.title}
          </Link>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
