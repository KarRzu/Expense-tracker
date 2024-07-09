import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useContext } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLoginUser } from "@/auth/hooks/useLoginUser";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegistrationSchema } from "./validation";
import { Input } from "@/components/shared/form/Input";
import { Form } from "@/components/shared/form/Form";
import { ButtonLoading } from "@/components/shared/buttons/ButtonLoading";

// Typ danych formularza
type SignInFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const { createUser, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { handleloginUser } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: yupResolver(RegistrationSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const userCredential = await createUser(data.email, data.password); // wywołanie funkcji createUser
      console.log(userCredential.user); // Zwracany jest obiekt, który zawiera informacje o nowo utworzonym użytkowniku

      // Dodanie użytkownika do Firestore
      const db = getFirestore();
      await setDoc(doc(db, "Users", userCredential.user.uid), {
        email: userCredential.user.email,
      });

      await handleloginUser({
        email: data.email,
        password: data.password,
        navigate: () => navigate("/src/components/ui/Profile.tsx"),
      });

      reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message, { position: "bottom-center" });
        });
      } else {
        toast.error("Error logging in", { position: "bottom-center" });
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-8 font-bold">Sign Up</h1>

        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
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
  );
}
