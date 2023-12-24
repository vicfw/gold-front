import OrderTable from "@/components/OrderTable";
import UserProvider from "@/components/UserProvider";
import { authGuard } from "@/utils/AuthGuard";
import PriceControl from "./PriceControl";

export const metadata = {
  title: "Admin Dashboard",
};

const AdminPage = async () => {
  const data = await authGuard("admin");

  return (
    <div className="h-[calc(100%-4rem)] p-5 lg:p-10 overflow-auto">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 lg:gap-10 h-full">
        <PriceControl />
        <OrderTable renderPage="admin" />
      </div>

      <UserProvider user={data} />
    </div>
  );
};

export default AdminPage;
