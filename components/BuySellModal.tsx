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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { OrderService } from "@/services/order";
import { useStore } from "@/store/store";
import React, { ChangeEvent, useState } from "react";

interface IBuySellModal {
  openModal: boolean;
  type: Type;
  toggleModalHandler: () => void;
  price: number | undefined;
}

const BuySellModal: React.FC<IBuySellModal> = ({
  openModal,
  type,
  toggleModalHandler,
  price: priceProp,
}) => {
  const { socket } = useStore((state) => state);
  const { toast } = useToast();
  const isBuy = type === "buy";
  const [amount, setAmount] = useState<number | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const goldValue = 4.3318;

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!priceProp) return;

    const inputValue = parseFloat(e.target.value);
    const amountValue = isNaN(inputValue) ? undefined : inputValue;

    setAmount(amountValue);

    const actualPrice = (priceProp / goldValue) * (amountValue || 0);
    const roundedPrice = Math.round(actualPrice);
    setPrice(roundedPrice);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!priceProp) return;
    const inputValue = parseFloat(e.target.value);
    const amountValue = isNaN(inputValue) ? undefined : inputValue;

    setPrice(amountValue);

    if (amountValue) {
      const actualPrice = (amountValue || 0) / (priceProp * goldValue);
      setAmount(parseFloat(actualPrice.toFixed(2)));
    } else {
      setAmount(undefined);
    }
  };

  const handleInputFocus = () => {
    price && setPrice(undefined);
    amount && setAmount(undefined);
  };

  const handleOrderSubmit = async () => {
    if (!price || !amount) return;

    const service = new OrderService();
    await service.createOrder({ type, price: price, amount });
    socket.emit("orderSubmit");
    toast({
      title: "سفارش شما ثبت شد.",
      variant: isBuy ? "success" : "destructive",
    });
    toggleModalHandler();
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={() => {
        handleInputFocus();
        toggleModalHandler();
      }}
    >
      <DialogContent className="w-[90%] lg:max-w-[415px]">
        <DialogHeader>
          <DialogTitle>درخواست {isBuy ? "خرید" : "فروش"}</DialogTitle>
          <DialogDescription
            className={cn(isBuy ? "text-green-600" : "text-red-600")}
          >
            {isBuy ? "خرید" : "فروش"} آبشده {isBuy ? "از" : "به"} ما با نرخ{" "}
            {priceProp?.toLocaleString()}
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
              مبلغ قابل پرداخت (ریال)
            </Label>
            <Input
              id="price"
              type="text"
              className="col-span-3"
              value={price || ""}
              onChange={handlePriceChange}
              placeholder="مبلغ مورد نظر خود را وارد نمایید"
              onFocus={handleInputFocus}
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
          <Button type="submit" onClick={handleOrderSubmit}>
            {isBuy ? "خرید" : "فروش"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuySellModal;
