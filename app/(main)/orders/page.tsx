import UserProvider from "@/components/UserProvider";
import React from "react";
import { cookies } from "next/headers";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { redirect } from "next/navigation";
import { AuthService } from "@/services/auth";

const OrdersPage = async () => {
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
    <div className="container">
      <UserProvider user={data} />
    </div>
  );
};

export default OrdersPage;
