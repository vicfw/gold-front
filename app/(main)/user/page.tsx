import OrderTable from "@/components/OrderTable";
import UserProvider from "@/components/UserProvider";
import { authGuard } from "@/utils/AuthGuard";
import SellBuy from "./SellBuy";

export const metadata = {
  title: "Dashboard",
};

const UserPage = async () => {
  const data = await authGuard("user");

  return (
    <div className="h-[calc(100%-4rem)] p-3 lg:p-10 overflow-auto">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 lg:gap-10 h-full">
        <SellBuy />
        <OrderTable renderPage="user" />
      </div>
      <UserProvider user={data} />
    </div>
  );
};

export default UserPage;
