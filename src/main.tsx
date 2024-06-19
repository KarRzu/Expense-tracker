import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { SignAppForm } from "./components/ui/SignAppForm.tsx";
import { NotFoundPage } from "./components/ui/NotFoundPage.tsx";
import { SignInForm } from "./components/ui/SignInForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signAppForm",
    element: <SignAppForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signinForm",
    element: <SignInForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
