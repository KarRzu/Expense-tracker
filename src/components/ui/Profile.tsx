import { useContext } from "react";
import { Button } from "./Button";
import { AuthContext } from "@/auth/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Wylogowywanie użytkownika z Firebase

      logOut(); // Wylogowywanie  użytkownika z aplikacji

      navigate("/SignInForm");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl p-6">Welcome</h1>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
}

export default Profile;
