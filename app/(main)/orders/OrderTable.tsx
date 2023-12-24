"use client";
import { OrderService } from "@/services/order";
import { Order } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrdersTable = () => {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>();

  const getTodayOrders = async () => {
    const service = new OrderService();
    try {
      const result = await service.getOrders();
      setOrders(result.data.data.orders);
    } catch (e) {
      router.push("/500");
    }
  };
  console.log(orders, "orders");

  useEffect(() => {
    getTodayOrders();
  }, []);

  return <div className="container"></div>;
};

export default OrdersTable;
