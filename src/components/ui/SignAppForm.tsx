import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Form } from "./Form";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export function SignAppForm() {
  const { createUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUser(email, password); //wywołanie funkcji createUser
      console.log(userCredential.user); //Zwracany jest obiekt, który zawiera informacje o nowo utworzonym użytkowniku

      // Dodanie użytkownika do Firestore
      const db = getFirestore();
      await setDoc(doc(db, "Users", userCredential.user.uid), {
        email: userCredential.user.email,
      });
      console.log("User Registered!");
      setEmail(""); //Resetowanie stanów pól formularza:
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Form onSubmit={handleRegister}>
          <h1 className="mb-8 font-bold">Sign Up</h1>

          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className="m-3" type="submit">
            Register
          </Button>
          <p>or</p>
          <Button className="m-3">
            <FontAwesomeIcon icon={faGoogle} className="m-2" />
            Register with Google
          </Button>
          <p>
            Already have an account?{" "}
            <Link to="/signInForm" className="text-blue-600">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
