"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { OrderService } from "@/services/order";
import { Order } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useStore } from "@/store/store";
import { useToast } from "@/components/ui/use-toast";
import { utcToZonedTime, format } from "date-fns-tz";

type TOrderTable = {
  renderPage: "user" | "admin";
};

const OrderTable = (props: TOrderTable) => {
  const { renderPage } = props;
  const { toast } = useToast();
  const { socket } = useStore((state) => state);

  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [orderData, setOrderData] = useState<
    { id: string; status: string } | undefined
  >();

  const iranTimezone = "Europe/Berlin";
  const utcDate = new Date();
  const iranDate = utcToZonedTime(utcDate, iranTimezone);

  const translate: Record<string, string> = {
    buy: "خرید",
    sell: "فروش",
    pending: "در انتظار",
    confirmed: "تایید شده",
    rejected: "رد شده",
    unknown: "نامشخص",
  };
  type Variant =
    | "link"
    | "default"
    | "destructive"
    | "success"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;

  const variantMapper: Record<string, Variant> = {
    pending: "info" as Variant,
    confirmed: "success",
    rejected: "destructive",
    unknown: "warning" as Variant,
  };

  const getTodayOrders = async () => {
    const service = new OrderService();
    try {
      const result = await service.getOrders(
        format(iranDate, "yyyy-MM-dd", { timeZone: iranTimezone })
      );
      setOrders(result.data.data.orders);
    } catch (e) {
      router.push("/500");
    }
  };

  const confirmOrder = async () => {
    if (!orderData) return;
    if (orderData.status === "pending") {
      try {
        const service = new OrderService();
        await service.confirmOrder(orderData.id, { status: "confirmed" });
        socket.emit("confirmOrder");

        setOrderData(undefined);
        handleToggleConfirmModal();
        toast({
          title: "سفارش تایید شد.",
          variant: "success",
        });
      } catch (e) {
        router.push("/500");
      }
    }
  };

  const handleToggleConfirmModal = () => {
    setOpenConfirmModal((prev) => !prev);
  };

  const hoverClasses = useCallback((status: string) => {
    return renderPage === "admin"
      ? "cursor-pointer"
      : status !== "pending"
      ? "cursor-not-allowed"
      : "cursor-default";
  }, []);

  useEffect(() => {
    getTodayOrders();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("tableRefetch", () => {
        getTodayOrders();
      });
    }
  }, [socket]);
  return (
    <>
      <Table className="overflow-hidden relative">
        <TableHeader className="sticky top-0 bg-white z-10">
          <TableRow>
            <TableHead className="w-[120px] text-center  lg:text-sm text-xs px-0 lg:px-4">
              نوع درخواست
            </TableHead>
            <TableHead className="text-center  lg:text-sm text-xs px-0 lg:px-4">
              مقدار
            </TableHead>
            <TableHead className="text-center  lg:text-sm text-xs px-0 lg:px-4">
              نرخ
            </TableHead>
            <TableHead className="text-center  lg:text-sm text-xs px-0 lg:px-4">
              توضیحات
            </TableHead>
            <TableHead className="text-center  lg:text-sm text-xs px-0 lg:px-4">
              وضعیت
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.length
            ? orders.map((order) => (
                <TableRow
                  className={cn("text-center ", hoverClasses(order.status))}
                  onClick={() => {
                    if (order.status !== "pending") return;
                    handleToggleConfirmModal();
                    setOrderData({ id: order._id, status: order.status });
                  }}
                >
                  <TableCell className="font-medium  lg:text-sm text-xs">
                    {translate[order.type]}
                  </TableCell>
                  <TableCell className="p-1  lg:text-sm text-xs">
                    {order.amount}
                  </TableCell>
                  <TableCell className="p-1  lg:text-sm text-xs">
                    {order.price} ریال
                  </TableCell>
                  <TableCell className="p-1  lg:text-sm text-xs">
                    {order.description}
                  </TableCell>
                  <TableCell className="p-1  lg:text-sm text-xs">
                    <Button
                      variant={variantMapper[order.status]}
                      className={cn(
                        hoverClasses(order.status),
                        "text-xs  lg:text-sm  p-2"
                      )}
                    >
                      {translate[order.status]}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {renderPage === "admin" && (
        <ConfirmModal
          openModal={openConfirmModal}
          toggleModalHandler={handleToggleConfirmModal}
        >
          <DialogContent className="w-[90%] lg:max-w-[415px]">
            <DialogHeader>
              <DialogTitle>آیا مطمئن هستید ؟</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center gap-10 py-3">
              <Button variant="destructive" onClick={handleToggleConfirmModal}>
                لغو
              </Button>
              <Button variant="success" onClick={confirmOrder}>
                تایید
              </Button>
            </div>
          </DialogContent>
        </ConfirmModal>
      )}
    </>
  );
};

export default OrderTable;
