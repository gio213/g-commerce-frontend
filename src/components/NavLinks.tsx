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
  console.log("categories", categories);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Search By Category</NavigationMenuTrigger>
          <NavigationMenuContent className="w-full ">
            {categories.map((category) => (
              <NavigationMenuLink
                key={category._id}
                href={`/category/${category._id}`}
                className="w-5 hover:bg-gray-200"
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
