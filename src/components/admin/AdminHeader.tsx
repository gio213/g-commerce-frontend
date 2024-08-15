import { useAppContext } from "@/context/AppContext";
import LogoutButton from "../LogoutButton";

import AdminDashboardNavLinks from "./layout/AdminDashboardNavLinks";

const AdminHeader = () => {
  const { user } = useAppContext();
  return (
    <header className="flex items-center justify-between w-full p-4 bg-gray-800 shadow-lg drop-shadow-2xl">
      <AdminDashboardNavLinks />

      <div className="flex items-center justify-between gap-2">
        <p className="w-16 font-semibold text-white">{`${user?.firstName[0]}  ${user?.lastName[0]}`}</p>

        <p className="text-white">Admin</p>

        <LogoutButton size={"icon"} variant={"destructive"} />
      </div>
    </header>
  );
};

export default AdminHeader;
