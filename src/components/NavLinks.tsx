import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navItems } from "../constants/index";
const NavLinks = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            {item.subPath && (
              <NavigationMenuContent className="flex flex-col p-4 w-fit">
                {item.subPath.map((subItem, index) => (
                  <NavigationMenuLink
                    key={index}
                    href={subItem.path}
                    className="w-full p-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <p className="truncate">{subItem.title}</p>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
