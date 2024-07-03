import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Form } from "./Form";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLoginUser } from "@/auth/hooks/useLoginUser";
import { useNavigate } from "react-router-dom";
import { ButtonLoading } from "./ButtonLoading";

const UserSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(10)
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
});

export function SignAppForm() {
  const { createUser, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { handleloginUser } = useLoginUser();

  console.log("Działa!!");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { email, password, confirmPassword };

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      await UserSchema.validate(formData, { abortEarly: false });
      console.log("Form submitted", formData);

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

      await handleloginUser({
        email,
        password,
        navigate: () => navigate("/src/components/ui/Profile.tsx"),
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newError: { [key: string]: string } = {};

        error.inner.forEach((err) => {
          if (err.path) {
            newError[err.path] = err.message;
          }
        });

        setErrors(newError);
      } else {
        toast.error("Error logging in", { position: "bottom-center" });
      }
    }
  };

  console.log(password);

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
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
          <ButtonLoading isLoading={isLoading} className="m-3" type="submit">
            Register
          </ButtonLoading>
          <p>or</p>
          <ButtonLoading isLoading={isLoading} className="m-3">
            <FontAwesomeIcon icon={faGoogle} className="m-2" />
            Register with Google
          </ButtonLoading>
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
