import AdminHeader from "../AdminHeader";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex flex-1">
        <div className="flex-1 p-4 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
