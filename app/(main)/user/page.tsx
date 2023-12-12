import UserProvider from "@/components/UserProvider";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SellBuy from "./SellBuy";

const UserPage = async () => {
  const cookie = cookies().get("jwt")?.value;
  const result = await isLoggedIn(cookie).catch((e) => redirect("/login"));
  const data = result.data.data.data;

  if (data.role !== "user") {
    redirect("/login");
  }

  return (
    <div className="h-full p-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 lg:gap-10">
        <SellBuy />
        <div>order</div>
      </div>
      <UserProvider user={data} />
    </div>
  );
};

export default UserPage;
