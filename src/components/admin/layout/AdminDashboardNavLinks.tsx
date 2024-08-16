import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
const AdminDashboardNavLinks = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin-dashboard", label: "Dashboard" },
    { path: "/admin-dashboard/add-product", label: "Add Product" },
    { path: "/admin-dashboard/products", label: "Products" },
    { path: "/admin-dashboard/orders", label: "Orders" },
    { path: "/", label: "Main" },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="bg-white rounded-lg shadow-md">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-semibold text-gray-700 rounded-t-lg w-fit hover:bg-gray-100">
            Admin Menu
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute z-50 w-full rounded-b-lg bg-gray-50">
            {navItems.map((category, index) => (
              <NavigationMenuLink
                onClick={() => navigate(category.path)}
                key={index}
                className={`block px-4 py-2 text-gray-700 w-96 hover:bg-gray-200 hover:text-gray-900 hover:cursor-pointer ${
                  index === navItems.length - 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {category.label}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AdminDashboardNavLinks;
