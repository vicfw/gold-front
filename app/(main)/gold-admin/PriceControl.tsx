"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PriceService } from "@/services/price";
import { useStore } from "@/store/store";
import React, { ChangeEvent, useEffect, useState } from "react";

const PriceControl = () => {
  const { socket } = useStore((state) => state);

  const [buyPriceInput, setBuyPriceInput] = useState<number | undefined>();
  const [sellPriceInput, setSellPriceInput] = useState<number | undefined>();
  const [buyPrice, setBuyPrice] = useState<number | undefined>();
  const [sellPrice, setSellPrice] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const createOrUpdatePriceHandler = async (type: string) => {
    if (
      (!buyPriceInput && type === "buy") ||
      (!sellPriceInput && type === "sell")
    )
      return;

    console.log(sellPriceInput, "sellPriceInput");

    const inputPrice = type === "buy" ? buyPriceInput : sellPriceInput;
    const setPrice = type === "buy" ? setBuyPrice : setSellPrice;

    const service = new PriceService();
    setIsLoading(true);
    await service.createOrUpdatePrice({ [type]: inputPrice });
    socket.emit("updatePrice");

    setPrice(inputPrice);
    type === "buy" ? setBuyPriceInput(undefined) : setSellPriceInput(undefined);

    setIsLoading(false);
  };

  const updatePriceByFive = async (operation: string, type: string) => {
    const currentPrice = type === "buy" ? buyPrice : sellPrice;
    if (currentPrice! < 5000 && operation === "decrease") return;

    const service = new PriceService();
    const newPrice =
      operation === "increase" ? currentPrice! + 5000 : currentPrice! - 5000;

    const updateObject = { [type]: newPrice };
    try {
      setIsLoading(true);

      const { data } = await service.createOrUpdatePrice(updateObject);

      if (type === "buy") {
        setBuyPrice(data.data.price.buy);
      } else {
        setSellPrice(data.data.price.sell);
      }
      socket.emit("updatePrice");
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const getPrices = async () => {
    const service = new PriceService();

    try {
      const result = await service.getPrices();
      setSellPrice(result.data.data.price.sell);
      setBuyPrice(result.data.data.price.buy);
    } catch (e) {}
  };

  const handleBuyPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyPriceInput(parseInt(e.target.value));
  };

  const handleSellPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPriceInput(parseInt(e.target.value));
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <div className="">
      <Card>
        <CardContent className="p-2 lg:p-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-5">
              <Button variant="success" className=" cursor-default p-2">
                <div>
                  <p>{buyPrice?.toLocaleString()}</p>
                  <p>قیمت خرید</p>
                </div>
              </Button>
              <div className="flex gap-5 justify-between">
                <Button
                  onClick={() => updatePriceByFive("increase", "buy")}
                  disabled={isLoading}
                >
                  + 5 هزار
                </Button>
                <Button
                  onClick={() => updatePriceByFive("decrease", "buy")}
                  disabled={isLoading}
                >
                  - 5 هزار
                </Button>
              </div>
              <div className="flex">
                <Input
                  placeholder="مبلغ خرید"
                  value={buyPriceInput ?? ""}
                  type="number"
                  onChange={handleBuyPriceChange}
                />
                <Button
                  onClick={() => createOrUpdatePriceHandler("buy")}
                  disabled={isLoading}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Button
                variant="destructive"
                className="cursor-default hover:bg-destructive p-2"
              >
                <div>
                  <p>{sellPrice?.toLocaleString()}</p>
                  <p>قیمت فروش</p>
                </div>
              </Button>
              <div className="flex justify-between gap-5">
                <Button
                  onClick={() => updatePriceByFive("increase", "sell")}
                  disabled={isLoading}
                >
                  + 5 هزار
                </Button>
                <Button
                  onClick={() => updatePriceByFive("decrease", "sell")}
                  disabled={isLoading}
                >
                  - 5 هزار
                </Button>
              </div>
              <div className="flex">
                <Input
                  onChange={handleSellPriceChange}
                  value={sellPriceInput ?? ""}
                  placeholder="مبلغ فروش"
                  type="number"
                />
                <Button
                  onClick={() => createOrUpdatePriceHandler("sell")}
                  disabled={isLoading}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceControl;
