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

  console.log(open, "open");

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
                <li className="rounded-sm">
                  <Link
                    href="/"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="text-gray-100">
                      {user.role === "admin" ? "Admin" : "User"}
                    </span>
                  </Link>
                </li>
                <li className="rounded-sm">
                  <Link
                    href="/mails"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <span className="text-gray-100">Mails</span>
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
