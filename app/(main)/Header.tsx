"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth";
import { useStore } from "@/store/store";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
type THeader = {
  handleToggleSidebar: () => void;
};

const Header = (props: THeader) => {
  const { handleToggleSidebar } = props;
  const { user, removeUser } = useStore((state) => state);
  const router = useRouter();
  const logout = () => {
    const service = new AuthService();
    try {
      service.logout();
      removeUser();
      // router.replace("/login");
      router.refresh();
    } catch (e) {}
  };

  return (
    <div
      className={cn(
        "h-16 bg-primary w-full flex items-center  px-5",
        user.role === "admin" ? "justify-between" : "justify-end"
      )}
    >
      {user.role === "admin" ? (
        <button onClick={handleToggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-white">سلام {user.name}</span>
            <ChevronDown color="#fff" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-primary text-white">
          <DropdownMenuLabel>خوش آمدید</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            خروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
