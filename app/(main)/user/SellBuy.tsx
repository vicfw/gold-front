"use client";
import BuySellModal from "@/components/BuySellModal";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriceService } from "@/services/price";
import { Price } from "@/types";
import { useStore } from "@/store/store";
export type Type = "sell" | "buy" | "";
const SellBuy = () => {
  const { socket } = useStore((state) => state);
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<Type>("");
  const [prices, setPrices] = useState<Price>();
  const toggleModalHandler = () => {
    setOpenModal((prev) => !prev);
  };
  const setTypeHandler = (type: Type) => {
    setType(type);
  };

  const getPrices = async () => {
    const service = new PriceService();
    const { data } = await service.getPrices();
    setPrices(data.data.price);
  };

  useEffect(() => {
    getPrices();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("updatedPrice_fetch", () => {
        getPrices();
      });
    }
  }, [socket]);

  return (
    <>
      <Card className="h-full overflow-auto lg:max-h-[110px] max-h-[300px]">
        <CardContent className="flex justify-center flex-col gap-3">
          <div className="flex justify-center gap-10">
            <span className="text-sm lg:text-md">مبالغ به ریال میباشد</span>
            {prices ? (
              <span className="text-sm lg:text-md">
                اپدیت قیمت {format(new Date(prices?.updatedAt), "HH:mm:ss")}
              </span>
            ) : null}
          </div>
          <div className="flex justify-between ">
            <Button
              variant="success"
              className="lg:py-6 lg:px-10 p-2 bg-green-600"
              onClick={() => {
                toggleModalHandler();
                setTypeHandler("buy");
              }}
            >
              <div>
                <p>{prices?.buy.toLocaleString()}</p>
                <p>خرید از ما</p>
              </div>
            </Button>
            <Button
              variant="destructive"
              className="lg:py-6 lg:px-10 p-2"
              onClick={() => {
                toggleModalHandler();
                setTypeHandler("sell");
              }}
            >
              <div>
                <p>{prices?.sell.toLocaleString()}</p>
                <p>فروش به ما</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
      <BuySellModal
        openModal={openModal}
        type={type}
        toggleModalHandler={toggleModalHandler}
        price={type === "buy" ? prices?.buy : prices?.sell}
      />
    </>
  );
};

export default SellBuy;
