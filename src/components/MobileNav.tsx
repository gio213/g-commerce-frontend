import MobileNavLinks from "./MobileNavLinks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { CircleUserRound, Menu } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

const MobileNav = () => {
  //   const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const mockUseAuth0 = {
    isAuthenticated: false,

    user: {
      name: "Test User",
      email: "testuser@example.com",
      picture: "https://example.com/testuser.jpg",
    },
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {mockUseAuth0.isAuthenticated ? (
            <>
              {mockUseAuth0?.user?.picture.length ? (
                <div className="flex flex-col gap-5 items-center">
                  <div className="flex justify-center items-center gap-2  ">
                    <Avatar className="border-orange-500 border-2">
                      <AvatarImage
                        className="animate-pulse"
                        src={mockUseAuth0?.user?.picture}
                        // alt={user?.name}
                      />
                    </Avatar>
                    <span>{mockUseAuth0.user.name}</span>
                  </div>
                  <Separator />
                  <MobileNavLinks />
                </div>
              ) : (
                <>
                  <CircleUserRound className="text-orange-500" />
                  {mockUseAuth0.user.email}
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <span>Welcome to Geeats.com</span>
              <Separator />
              <SheetDescription className="flex">
                <Button
                  //   onClick={() => loginWithRedirect()}
                  className="flex-1 font-bold bg-orange-500"
                >
                  Log In
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
