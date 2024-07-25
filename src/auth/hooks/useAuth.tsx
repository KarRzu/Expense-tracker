import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export function useAuth() {
  console.log("useAuth");
  const { user, isLoading } = useContext(AuthContext);

  return { user, isLoading };
}
