import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { useLoginUser } from "@/auth/hooks/useLoginUser";
import { Input } from "@/components/shared/form/Input";
import { Form } from "@/components/shared/form/Form";
import { ButtonLoading } from "@/components/shared/buttons/ButtonLoading";
import { LoginFormData, LoginSchema } from "../sign-up/validation";
import { ROUTES } from "@/router/routes";
import { useAuth } from "@/auth/hooks/useAuth";

export function SignInForm() {
  const navigate = useNavigate();
  const { handleloginUser, isLoading } = useLoginUser();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await handleloginUser({
        email: data.email,
        password: data.password,
        navigate: () => {
          navigate(ROUTES.dashboard);
        },
      });

      reset();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (user) {
    navigate(ROUTES.dashboard);
  }

  return (
    <>
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
      </Form>
    </>
  );
}
