import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export function SignAppForm() {
  return (
    <>
      <div className="flex items-center justify-center">
        <form className=" w-full max-w-md px-2 py-10 bg-slate-100 rounded-lg flex flex-col justify-center">
          <h1 className="mb-8 font-bold">Sign Up</h1>
          <label htmlFor="email" className="mr-80 font-bold">
            Email
          </label>
          <Input type="email" id="email" placeholder="Enter your email" />
          <label htmlFor="password" className="mr-72 font-bold">
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <label htmlFor="password" className="mr-60 font-bold">
            Confirm password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <Button className="m-3">Register</Button>
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
        </form>
      </div>
    </>
  );
}
