"use client";

import { useRouter } from "next/navigation";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types";
import { OrderService } from "@/services/order";
import { Button } from "@/components/ui/button";
import { translate, variantMapper } from "@/utils/constants";
import { format } from "date-fns-jalali";
import { parseISO } from "date-fns";

const OrdersTable = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>();
  const getTodayOrders = async () => {
    const service = new OrderService();
    try {
      const result = await service.getOrders();
      setOrders(result.data.data.orders);
    } catch (e) {}
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "type",
      header: () => <div className="text-right">نوع درخواست</div>,
      cell: ({ row }) => {
        const value = row.getValue("type");
        const formatted = translate[value as string];
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "user",
      accessorFn: (row) => row.user?.name,
      header: () => <div className="text-right">نام</div>,
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">مقدار</div>,
      cell: ({ row }) => {
        const value = row.getValue("amount") as number;
        return <div className="text-right font-medium">{value} گرم</div>;
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">نرخ</div>,
      cell: ({ row }) => {
        const value = row.getValue("price") as number;
        return (
          <div className="text-right font-medium">
            {value.toLocaleString()} ریال
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-right">وضعیت</div>,
      cell: ({ row }) => {
        const value = row.getValue("status");
        const formatted = translate[value as string];
        return (
          <div className="text-right font-medium">
            <Button variant={variantMapper[value as string]}>
              {formatted}
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">تاریخ</div>,
      cell: ({ row }) => {
        const value = row.getValue("createdAt") as string;
        const date = parseISO(value);
        return (
          <div className="text-right font-medium">
            {format(date, "yyyy/MM/dd")}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getTodayOrders();
  }, []);

  return (
    <div className="h-[50vh]">
      {orders?.length ? <DataTable data={orders} columns={columns} /> : null}
    </div>
  );
};

export default OrdersTable;
