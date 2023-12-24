import UserProvider from "@/components/UserProvider";
import React from "react";
import { cookies } from "next/headers";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const cookie = cookies().get("jwt")?.value;
  const result = await isLoggedIn(cookie).catch((e) => redirect("/login"));
  const data = result.data.data.data;

  if (data.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="container">
      <UserProvider user={data} />
    </div>
  );
};

export default OrdersPage;
