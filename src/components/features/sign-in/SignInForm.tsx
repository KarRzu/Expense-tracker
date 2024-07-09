import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { useLoginUser } from "@/auth/hooks/useLoginUser";
import { Input } from "@/components/shared/form/Input";
import { Form } from "@/components/shared/form/Form";
import { ButtonLoading } from "@/components/shared/buttons/ButtonLoading";
import { LoginFormData, LoginSchema } from "../sign-up/validation";

export function SignInForm() {
  const navigate = useNavigate();
  const { handleloginUser, isLoading } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await handleloginUser({
        email: data.email,
        password: data.password,
        navigate: () => navigate("/src/components/ui/Profile.tsx"),
      });

      reset();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-8 font-bold">Sign In</h1>
          <Input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}

          <Input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}

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
