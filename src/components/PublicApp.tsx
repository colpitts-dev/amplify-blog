import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { PublicLanding } from "../pages/PublicLanding";
import { Footer } from "./lib";

import { SignInForm } from "./auth/SignInForm";
import { SignUpForm } from "./auth/SingUpForm";
import { ConfirmSignUpForm } from "./auth/ConfirmSignUpForm";

const PublicApp: React.FC = ({ children }) => {
  console.log("PUBLIC APP LOADED");
  const location = useLocation();

  return (
    <article>
      <main className="container px-4 pt-12 mx-auto mb-32 lg:max-w-lg">
        <Routes>
          <Route path="/" element={<PublicLanding />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/verify-email" element={<ConfirmSignUpForm />} />
          <Route
            path="*"
            element={<Navigate to={"/sign-in"} state={{ from: location }} />}
          />
        </Routes>
      </main>
      <Footer />
    </article>
  );
};

export default PublicApp;
