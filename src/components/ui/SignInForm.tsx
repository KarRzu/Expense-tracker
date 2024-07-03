import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Form } from "./Form";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "@/auth/hooks/useLoginUser";
import { ButtonLoading } from "./ButtonLoading";

export function SignInForm() {
  const navigate = useNavigate();
  const { handleloginUser, isLoading } = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("Sign In dziala");
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // const UserSchema = Yup.object().shape({
  //   email: Yup.string().email().required("Email is required"),
  //   password: Yup.string()
  //     .required("Password is required")
  //     .min(8, "Password must be at least 8 characters")
  //     .max(10)
  //     .matches(
  //       /[!@#$%^&*(),.?":{}|<>]/,
  //       "Password must contain at least one symbol"
  //     ),
  // });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleloginUser({
      email,
      password,
      navigate: () => navigate("/src/components/ui/Profile.tsx"),
    });
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
          {/* {errors.email && <p className="text-red-500">{errors.email}</p>} */}
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* {errors.password && <p className="text-red-500">{errors.password}</p>} */}
          <ButtonLoading isLoading={isLoading} className="m-3" type="submit">
            Login
          </ButtonLoading>
          <p>or</p>
          <ButtonLoading isLoading={isLoading} className="m-3">
            {" "}
            <FontAwesomeIcon icon={faGoogle} className="m-2" />
            Login with Google
          </ButtonLoading>
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
