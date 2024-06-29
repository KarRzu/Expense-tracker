import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { SignInForm } from "./components/ui/SignInForm";

function App() {
  return (
    <>
      <SignInForm />
      <ToastContainer />
    </>
  );
}

export default App;
