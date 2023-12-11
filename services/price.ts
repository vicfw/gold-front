import { Price } from "@/types";
import { axiosInstance } from "@/utils/axiosConfig";
import { AxiosResponse } from "axios";

interface PriceResponse {
  data: { price: Price };
  status: string;
}

export class PriceService {
  accessToken: string | null;
  constructor() {
    const token = localStorage.getItem("token");
    this.accessToken = token;
  }
  async createOrUpdatePrice(values: {
    sell?: number | undefined;
    buy?: number | undefined;
    active?: boolean;
  }): Promise<AxiosResponse<PriceResponse>> {
    return await axiosInstance.post("/prices", values, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async getPrices(): Promise<AxiosResponse<PriceResponse>> {
    return await axiosInstance.get("/prices/current", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}
