import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboardNavLinks = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin-dashboard/add-product", label: "Add Product" },
    { path: "/admin-dashboard/products", label: "Products" },
    { path: "/admin-dashboard/orders", label: "Orders" },
  ];

  return (
    <div className="flex gap-4 mt-4">
      {navItems.map((item) => (
        <Button
          key={item.path}
          onClick={() => navigate(item.path)}
          variant="secondary"
          size="default"
        >
          {item.label}
        </Button>
      ))}
      <Button size="default" variant="destructive">
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};

export default AdminDashboardNavLinks;
