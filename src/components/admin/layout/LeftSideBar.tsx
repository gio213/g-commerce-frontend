import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-1/12 h-screen text-white bg-gray-800 drop-shadow-xl">
      <h1>Menu</h1>
      <Button
        onClick={() => {
          navigate("/admin-dashboard/add-product");
        }}
        className="mt-4 "
        variant={"secondary"}
        size={"default"}
      >
        Add Product
      </Button>
      <Button
        onClick={() => {
          navigate("/admin-dashboard/products");
        }}
        className="mt-4 "
        variant={"secondary"}
        size={"default"}
      >
        Products
      </Button>
    </div>
  );
};

export default LeftSideBar;
