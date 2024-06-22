import { ShoppingBasket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserNameMenu from "./UserNameMenu";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";

const MainMenu = () => {
  const { isLoggedin } = useAppContext();
  const navigate = useNavigate();

  return (
    <span className="items-center hidden space-x-2 md:flex">
      {isLoggedin ? (
        <>
          <div className="flex items-center justify-center">
            <Link
              to="/shopping-card"
              className="font-bold hover:text-orange-500"
            >
              <span className="flex items-center gap-1 ">
                <>
                  <ShoppingBasket size={20} />
                </>
              </span>
            </Link>
            <UserNameMenu />
          </div>
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => {
            navigate("/sign-in");
          }}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainMenu;
