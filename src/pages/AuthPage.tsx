import { SignInForm } from "@/components/features/sign-in/SignInForm";
import { SignUpForm } from "@/components/features/sign-up/SignUpForm";
import { useState } from "react";

export function AuthPage() {
  const [formType, setFormType] = useState<"sign-in" | "sign-up">("sign-in");
  console.log(formType);

  function toogleFormType() {
    if (formType === "sign-in") {
      setFormType("sign-up");
    } else {
      setFormType("sign-in");
    }
  }
  return (
    <div className="h-screen p-4 flex justify-center items-center">
      <div className="flex  flex-col bg-slate-200 rounded-lg items-center justify-center h-auto w-1/2 p-4">
        {formType === "sign-in" ? <SignInForm /> : <SignUpForm />}
        <p>
          Don't have an account?{" "}
          <span onClick={toogleFormType}>{formType}</span>
        </p>
      </div>
    </div>
  );
}
