import { Order } from "@/types";
import { axiosInstance } from "@/utils/axiosConfig";
import { AxiosResponse } from "axios";

interface OrderResponse {
  data: { orders: Order[] };
  status: string;
}

export class OrderService {
  accessToken: string | null;
  constructor() {
    const token = localStorage.getItem("token");
    this.accessToken = token;
  }
  async createOrder(values: {
    type: string;
    amount: number;
    price: number;
  }): Promise<AxiosResponse<OrderResponse>> {
    return await axiosInstance.post("/orders", values, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async getOrders(currentDate: string): Promise<AxiosResponse<OrderResponse>> {
    return await axiosInstance.get(`/orders`, {
      params: {
        createdDate: currentDate,
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async confirmOrder(
    id: string,
    values: {
      status: string;
    }
  ): Promise<AxiosResponse<OrderResponse>> {
    return await axiosInstance.patch(`/orders/${id}`, values, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}
