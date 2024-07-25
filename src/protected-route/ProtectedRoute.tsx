import { AuthContext } from "@/auth/AuthProvider";
import { useAuth } from "@/auth/hooks/useAuth";
import { useLocalStorage } from "@/auth/hooks/useLocalStorage";
import { ROUTES } from "@/router/routes";
import { User } from "firebase/auth";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { setValue, getValue, removeValue } = useLocalStorage();
  // console.log("protectedRoute");
  // const { user, setUser } = useContext(AuthContext);

  // console.log(user, "userProtected");

  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("useEffect");
    const user = getValue<User>("user");

    console.log(user);
    if (!user) {
      return setUser(null);
    }

    setUser(user as User);
  }, []);

  if (!user) {
    return <Navigate to={ROUTES.auth} />;
  }

  return <>{children}</>;
};
