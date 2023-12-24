"use client";

import Link from "next/link";
import * as React from "react";
import Header from "./Header";
import { useStore } from "@/store/store";
import io from "socket.io-client";
import { cn } from "@/lib/utils";

type TLayoutComponent = { children: React.ReactNode };

const LayoutComponent = (props: TLayoutComponent) => {
  const { children } = props;
  const [open, setOpen] = React.useState(false);
  const socketRef = React.useRef<any>();
  const { user, setSocket } = useStore((state) => state);
  const handleToggleSidebar = () => {
    setOpen((prev) => !prev);
  };
  React.useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL!, {
      // secure: true,
      transports: ["websocket"],
    });
    setSocket(socket);
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-screen bg-primary shadow duration-300",
          !open ? "w-0 p-0" : "lg:w-44 p-3 w-20"
        )}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {open && (
              <h2 className="font-bold text-white text-sm lg:text-xl">
                امیر گلد
              </h2>
            )}
          </div>

          {open && (
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm group hover:bg-slate-100 ">
                  <Link
                    href="/orders"
                    className="flex items-center p-2 space-x-3 rounded-md "
                  >
                    <span className="text-gray-100 group-hover:text-black">
                      سفارشات
                    </span>
                  </Link>
                </li>
                <li className="rounded-sm group hover:bg-slate-100 ">
                  <Link
                    href="/users"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <span className="text-gray-100 group-hover:text-black">
                      کاربران
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full">
        <Header handleToggleSidebar={handleToggleSidebar} />
        {children}
      </div>
    </>
  );
};

export default LayoutComponent;
