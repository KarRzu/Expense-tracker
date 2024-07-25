import { useContext, useEffect } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/shared/buttons/Button";
import { ROUTES } from "@/router/routes";

function Profile() {
  const navigate = useNavigate();
  const { logOut, user } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Wylogowywanie użytkownika z Firebase

      logOut(); // Wylogowywanie  użytkownika z aplikacji

      navigate(ROUTES.signIn);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.signIn);
    }
  }, []);

  return (
    <>
      {/* <h1 className="text-2xl p-6">Welcome</h1> */}
      <Button onClick={handleLogOut}>Logout</Button>

      <nav className="w-52 p-4  -translate-x-20	-translate-y-16">
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Budget Planer
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Cards
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Expense
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-500 hover:underline">
              Raports
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Profile;
