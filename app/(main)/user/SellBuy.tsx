"use client";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriceService } from "@/services/price";
import { Price } from "@/types";
export type Type = "sell" | "buy" | "";
const SellBuy = () => {
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

  return (
    <>
      <Card>
        <CardContent className="flex justify-center flex-col gap-3">
          <div className="flex justify-center gap-10">
            <span>مبالغ به ریال میباشد</span>
            {prices ? (
              <span>
                اپدیت قیمت {format(new Date(prices?.updatedAt), "HH:mm:ss")}
              </span>
            ) : null}
          </div>
          <div className="flex justify-between ">
            <Button
              variant="success"
              className="py-6 px-10 bg-green-600"
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
              className="py-6 px-10"
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
      <Modal
        openModal={openModal}
        type={type}
        toggleModalHandler={toggleModalHandler}
      />
    </>
  );
};

export default SellBuy;
