import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { NotFoundPage } from "./components/ui/NotFoundPage.tsx";

import { AuthProvider } from "./auth/AuthProvider.tsx";
import { SignInForm } from "./components/ui/SignInForm.tsx";
import Profile from "./components/ui/Profile.tsx";
import { SignUpForm } from "./components/components/features/sign-up/SignUpForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signAppForm",
    element: <SignUpForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/signinForm",
    element: <SignInForm />,
  },
  {
    path: "/src/components/ui/Profile.tsx",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>
);
