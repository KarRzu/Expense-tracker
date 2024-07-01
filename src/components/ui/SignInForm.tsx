import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Form } from "./Form";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function SignInForm() {
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      await UserSchema.validate(formData, { abortEarly: false });
      console.log("Form submitted", formData);

      const userCredential = await loginUser(email, password); //wywołanie funkcji loginUser
      console.log(userCredential.user);
      console.log("User logged in Successfully!");
      navigate("/src/components/ui/Profile.tsx");
      toast.success("User logged in Successfully!", { position: "top-center" });
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

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-8 font-bold">Sign In</h1>
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
          <Button className="m-3" type="submit">
            Login
          </Button>
          <p>or</p>
          <Button className="m-3">
            {" "}
            <FontAwesomeIcon icon={faGoogle} className="m-2" />
            Login with Google
          </Button>
          <p>
            Don't have an account?{" "}
            <Link to="/signAppForm" className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
}
