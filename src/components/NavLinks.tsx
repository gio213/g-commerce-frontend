import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAppContext } from "@/context/AppContext";

const NavLinks = () => {
  const { categories } = useAppContext();

  return (
    <NavigationMenu>
      <NavigationMenuList className="bg-white rounded-lg shadow-md">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-4 py-2 text-lg font-semibold text-gray-700 rounded-t-lg hover:bg-gray-100">
            Search By Category
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-full rounded-b-lg bg-gray-50">
            {categories.map((category) => (
              <NavigationMenuLink
                key={category._id}
                href={`/category/${category._id}`}
                className="block px-4 py-2 text-gray-700 w-96 hover:bg-gray-200 hover:text-gray-900"
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
