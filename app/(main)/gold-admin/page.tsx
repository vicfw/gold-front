import UserProvider from "@/components/UserProvider";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PriceControl from "./PriceControl";
import OrderTable from "@/components/OrderTable";
import { AuthService } from "@/services/auth";

export const metadata = {
  title: "Admin Dashboard",
};

const AdminPage = async () => {
  const authService = new AuthService();
  const cookie = cookies().get("jwt")?.value;
  const result = await isLoggedIn(cookie).catch((e) => {
    if (cookie) {
      authService.logout();
    }
    redirect("/login");
  });
  const data = result.data.data.data;

  if (data.role !== "admin") {
    redirect("/login");
  }

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
