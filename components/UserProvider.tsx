"use client";

import { useStore } from "@/store/store";
import { User } from "@/types";
import { useEffect } from "react";

const UserProvider = ({ user }: { user: User }) => {
  const { setUser } = useStore((state) => state);
  useEffect(() => {
    setUser(user);
  }, [user]);

  return null;
};

export default UserProvider;
