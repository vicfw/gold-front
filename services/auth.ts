import { User } from "@/types";
import { axiosInstance } from "@/utils/axiosConfig";
import { AxiosResponse } from "axios";

export class AuthService {
  async login(values: {
    phone: string;
    password: string;
  }): Promise<AxiosResponse<{ token: string; data: { user: User } }>> {
    return await axiosInstance.post("/users/login", values);
  }
  async isLoggedIn(cookie: string | undefined) {
    return await axiosInstance.get("/users/me", {
      headers: { cookie },
    });
  }

  async logout() {
    return await axiosInstance.get("/users/logout");
  }
}
