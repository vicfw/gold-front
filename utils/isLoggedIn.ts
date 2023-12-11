import { AuthService } from "@/services/auth";

export const isLoggedIn = async (cookie: string | undefined) => {
  const service = new AuthService();

  return service.isLoggedIn(cookie);
};
