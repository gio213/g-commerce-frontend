import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { useAppContext } from "@/context/AppContext";
import LogoutButton from "./LogoutButton";

const UserNameMenu = () => {
  const { user } = useAppContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="font-bold hover:text-orange-500">
        {user?.firstName?.length ? (
          <span>
            <h1 className="font-mono text-xl font-bold">
              {user?.firstName[0] + user?.lastName[0]}
            </h1>
          </span>
        ) : (
          <CircleUser className="text-orange-500" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/manage-orders" className="font-bold hover:text-orange-500">
            Manage Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
