import { cookies } from "next/headers";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { redirect } from "next/navigation";
import { User } from "@/types";

export const authGuard = async (userType: "user" | "admin"): Promise<User> => {
  const cookie = cookies().get("jwt")?.value;
  const result = await isLoggedIn(cookie).catch((e) => redirect("/login"));
  const data = result.data.data.data;

  if (data.role !== userType) {
    return redirect("/403");
  }
  return data;
};

export const loginAuthGuard = () => {};
