import UserProvider from "@/components/UserProvider";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PriceControl from "./PriceControl";

const AdminPage = async () => {
  const cookie = cookies().get("jwt")?.value;
  const result = await isLoggedIn(cookie).catch((e) => redirect("/login"));
  const data = result.data.data.data;

  if (data.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="h-full lg:p-10 p-1">
      <PriceControl />
      <UserProvider user={data} />
    </div>
  );
};

export default AdminPage;
