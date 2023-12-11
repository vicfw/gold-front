import UserProvider from "@/components/UserProvider";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PriceControl from "./PriceControl";

const AdminPage = async (props: any) => {
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
