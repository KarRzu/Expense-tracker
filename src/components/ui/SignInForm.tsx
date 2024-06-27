import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export function SignInForm() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form className="w-full max-w-md p-12 bg-slate-100 rounded-lg flex flex-col justify-center">
          <h1 className="mb-8 font-bold">Sign In</h1>
          <Input type="email" id="email" placeholder="Enter your email" />
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <Button className="m-3">Login</Button>
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
        </form>
      </div>
    </>
  );
}
