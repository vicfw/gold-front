"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PriceService } from "@/services/price";
import React, { ChangeEvent, useEffect, useState } from "react";

const PriceControl = () => {
  const [buyPriceInput, setBuyPriceInput] = useState<number | undefined>();
  const [sellPriceInput, setSellPriceInput] = useState<number | undefined>();
  const [buyPrice, setBuyPrice] = useState<number | undefined>();
  const [sellPrice, setSellPrice] = useState<number | undefined>();

  const createOrUpdatePrice = async (mode: string) => {
    const service = new PriceService();
    await service.createOrUpdatePrice(
      mode === "buy" ? { buy: buyPriceInput } : { sell: sellPriceInput }
    );
    if (mode === "buy") {
      setBuyPrice(buyPriceInput);
      setBuyPriceInput(undefined);
    } else {
      setSellPrice(sellPriceInput);
      setSellPriceInput(undefined);
    }
  };

  const updateBuyPriceByFive = async (operation: string) => {
    if (buyPrice! < 5000 && operation === "decrease") return;
    const service = new PriceService();
    const { data } = await service.createOrUpdatePrice(
      operation === "increase"
        ? { buy: buyPrice! + 5000 }
        : { buy: buyPrice! - 5000 }
    );
    setBuyPrice(data.data.price.buy);
  };

  const updateSellPriceByFive = async (operation: string) => {
    if (sellPrice! < 5000 && operation === "decrease") return;
    const service = new PriceService();
    const { data } = await service.createOrUpdatePrice(
      operation === "increase"
        ? { sell: sellPrice! + 5000 }
        : { sell: sellPrice! - 5000 }
    );
    setSellPrice(data.data.price.sell);
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
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 lg:gap-10">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between gap-1 lg:gap-0 ">
            <div className="flex flex-col gap-5">
              <Button variant="secondary" className="lg:py-6 lg:px-10">
                <div>
                  <p>{buyPrice?.toLocaleString()}</p>
                  <p>قیمت خرید</p>
                </div>
              </Button>
              <div className="flex gap-5 justify-between">
                <Button onClick={() => updateBuyPriceByFive("increase")}>
                  + 5 هزار
                </Button>
                <Button onClick={() => updateBuyPriceByFive("decrease")}>
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
                <Button onClick={() => createOrUpdatePrice("buy")}>+</Button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <Button variant="destructive" className="lg:py-6 lg:px-10">
                <div>
                  <p>{sellPrice?.toLocaleString()}</p>
                  <p>قیمت فروش</p>
                </div>
              </Button>
              <div className="flex justify-between gap-5">
                <Button onClick={() => updateSellPriceByFive("increase")}>
                  + 5 هزار
                </Button>
                <Button onClick={() => updateSellPriceByFive("decrease")}>
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
                <Button onClick={() => createOrUpdatePrice("sell")}>+</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>order</div>
    </div>
  );
};

export default PriceControl;
