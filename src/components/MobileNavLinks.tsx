import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { MessageCircleQuestionIcon } from "lucide-react";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  return (
    <>
      <Link
        className="flex bg-white items-center font-bold hover:text-orange-500"
        to="/user-profile"
      >
        User Profile
      </Link>
      <Separator />
      <Link
        to={"manage-restaurant"}
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Manage Restaurant
      </Link>
      <Separator />
      <Link to="/order-status" className="font-bold hover:text-orange-500">
        <span className="flex gap-1 items-center">
          Order Status <MessageCircleQuestionIcon size={20} />
        </span>
      </Link>
      <Separator />

      <Button
        // onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
