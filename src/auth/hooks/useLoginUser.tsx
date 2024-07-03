import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { toast } from "react-toastify";

type LoginUserParams = {
  email: string;
  password: string;
  navigate: () => void;
};

export function useLoginUser() {
  const { loginUser, isLoading } = useContext(AuthContext);
  const handleloginUser = async ({
    email,
    password,
    navigate,
  }: LoginUserParams) => {
    try {
      await loginUser(email, password); //wywołanie funkcji loginUser
      navigate();
      toast.success("User logged in Successfully!", { position: "top-center" });
    } catch (error) {
      toast.error("Error logging in", { position: "bottom-center" });
    }
  };
  return { handleloginUser, isLoading };
}
