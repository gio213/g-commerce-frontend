import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NavLinks = () => {
  const { categories } = useAppContext();
  const navigate = useNavigate();
  const params = useParams<{ categoryId: string }>();
  const [, setCategoryId] = useState(params.categoryId || "");

  const handleParams = (categoryId: string) => {
    setCategoryId(categoryId);
    navigate(`/search/category/${categoryId}`);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="bg-white rounded-lg shadow-md">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-semibold text-gray-700 rounded-t-lg w-fit hover:bg-gray-100">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-full rounded-b-lg bg-gray-50">
            {categories.map((category) => (
              <NavigationMenuLink
                onClick={() => handleParams(category._id)}
                key={category._id}
                className="block px-4 py-2 text-gray-700 w-96 hover:bg-gray-200 hover:text-gray-900 hover:cursor-pointer"
              >
                {category.categoryName}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
