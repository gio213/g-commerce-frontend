import AdminHeader from "../AdminHeader";
import LeftSideBar from "./LeftSideBar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <LeftSideBar />
        <div className="container flex-1 py-10 mx-auto ">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
