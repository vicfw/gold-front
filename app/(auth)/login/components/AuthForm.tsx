"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { setUser } = useStore((state) => state);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [values, setValues] = React.useState({
    phone: "",
    password: "",
  });
  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [serverError, setServerError] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    phoneError && setPhoneError("");
    passwordError && setPasswordError("");
    serverError && setServerError("");
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    let valid = true;
    if (!values.phone) {
      setPhoneError("شماره تلفن خالی است");

      valid = false;
    }
    if (!values.password) {
      setPasswordError("رمز عبور خالی است");
      valid = false;
    }

    if (!valid) {
      return;
    }

    const service = new AuthService();
    try {
      const { data } = await service.login(values);
      localStorage.setItem("token", data.token);
      setUser(data.data.user);
      if (data.data.user.role === "user") {
        router.replace("/user");
      } else {
        router.replace("/gold-admin");
      }
    } catch (e: any) {
      const { message } = e.response?.data;
      if (message.includes("Incorrect")) {
        setServerError("شماره تلفن یا رمز عبور نادرست میباشد.");
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {serverError && <Alert variant="destructive">{serverError}</Alert>}
      <form onSubmit={onSubmit}>
        <div className="grid gap-5">
          <div className="grid gap-3">
            <Label htmlFor="phone">شماره تلفن</Label>
            <Input
              name="phone"
              id="phone"
              placeholder="شماره تماس خود را وارد نمایید"
              type="number"
              disabled={isLoading}
              onChange={handleInputChange}
            />
            {phoneError && (
              <span className="text-red-500 text-xs">{phoneError}</span>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              name="password"
              placeholder="رمز عبور خود را وارد نمایید"
              type="password"
              disabled={isLoading}
              onChange={handleInputChange}
            />
            {passwordError && (
              <span className="text-red-500 text-xs">{passwordError}</span>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            ورود
          </Button>
        </div>
      </form>
    </div>
  );
}
