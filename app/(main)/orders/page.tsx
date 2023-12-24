import UserProvider from "@/components/UserProvider";
import { authGuard } from "@/utils/AuthGuard";
import OrdersTable from "./OrderTable";

export const metadata = {
  title: "سفارشات",
};

const OrdersPage = async () => {
  const data = await authGuard("admin");

  return (
    <>
      <OrdersTable />
      <UserProvider user={data} />
    </>
  );
};

export default OrdersPage;
