import UserProvider from "@/components/UserProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
        <Card>
          <CardContent className="flex justify-center flex-col gap-3">
            <div className="flex justify-center gap-10">
              <span>مبالغ به ریال میباشد</span>
              <span>اپدیت قیمت {format(Date.now(), "HH:mm:ss")}</span>
            </div>
            <div className="flex justify-between ">
              <Button variant="destructive" className="py-6 px-10">
                <div>
                  <p>106,150,000</p>
                  <p>فروش به ما</p>
                </div>
              </Button>
              <Button variant="secondary" className="py-6 px-10">
                <div>
                  <p>106,150,000</p>
                  <p>خرید از ما</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div>order</div>
      </div>
      <UserProvider user={data} />
    </div>
  );
};

export default UserPage;
