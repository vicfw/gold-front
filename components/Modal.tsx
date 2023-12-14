import { Type } from "@/app/(main)/user/SellBuy";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useState } from "react";

interface IModal {
  openModal: boolean;
  type: Type;
  toggleModalHandler: () => void;
  price: number | undefined;
}

const Modal: React.FC<IModal> = ({
  openModal,
  type,
  toggleModalHandler,
  price: priceProp,
}) => {
  const isBuy = type === "buy";
  const [amount, setAmount] = useState<number | undefined>();
  const [price, setPrice] = useState<string>("");
  const goldValue = 4.3318;

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!priceProp) return;

    const inputValue = parseInt(e.target.value);
    const amountValue = isNaN(inputValue) ? undefined : inputValue;

    setAmount(amountValue);

    const actualPrice = (priceProp / goldValue) * (amountValue || 0);
    const roundedPrice = Math.round(actualPrice);
    setPrice(`${roundedPrice.toLocaleString()} ریال`);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!priceProp) return;

    const numericInput = e.target.value.replace(/[^0-9]/g, "");
    setPrice(`${parseInt(numericInput).toLocaleString()} ریال`);

    if (numericInput !== "") {
      const actualPrice = (priceProp * goldValue) / parseInt(numericInput, 10);
      setAmount(Math.round(actualPrice));
    } else {
      setAmount(undefined);
    }
  };

  const handleInputFocus = () => {
    price && setPrice("");
    amount && setAmount(undefined);
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={() => {
        handleInputFocus();
        toggleModalHandler();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>درخواست {isBuy ? "خرید" : "فروش"}</DialogTitle>
          <DialogDescription
            className={cn(isBuy ? "text-green-600" : "text-red-600")}
          >
            {isBuy ? "خرید" : "فروش"} آبشده {isBuy ? "از" : "به"} ما با نرخ{" "}
            {priceProp}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="amount" className="text-right">
              مقدار درخواست
            </Label>
            <Input
              id="amount"
              type="number"
              className="col-span-3"
              onChange={handleAmountChange}
              value={amount || ""}
              placeholder="وزن مورد نظر خود را وارد نمایید"
              onFocus={handleInputFocus}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="price" className="text-right">
              مبلغ قابل پرداخت
            </Label>
            <Input
              id="price"
              type="text"
              className="col-span-3"
              value={price}
              onChange={handlePriceChange}
              placeholder="مبلغ مورد نظر خود را وارد نمایید"
              onFocus={handleInputFocus}
              pattern="[0-9]*"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            type="submit"
            onClick={() => {
              handleInputFocus();
              toggleModalHandler();
            }}
          >
            انصراف
          </Button>
          <Button type="submit">{isBuy ? "خرید" : "فروش"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
