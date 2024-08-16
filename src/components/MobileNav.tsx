import MobileNavLinks from "./MobileNavLinks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Menu } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const MobileNav = () => {
  const { user, isLoggedin } = useAppContext();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isLoggedin ? (
            <>
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center justify-center gap-2 ">
                  <Avatar className="flex items-center justify-center border-2 border-customBlue">
                    <p>
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </p>
                  </Avatar>
                  <div>
                    <span>{user?.role}</span>
                  </div>
                </div>
                <Separator />
                <MobileNavLinks />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <span>Log in to access your account</span>
              <Separator />
              <SheetDescription className="flex">
                <Button className="flex-1 font-bold bg-orange-500">
                  <SheetClose asChild>
                    <Link to="/sign-in">Log In</Link>
                  </SheetClose>
                </Button>
              </SheetDescription>
            </div>
          )}
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
