import React, { lazy } from "react";
import { useAuth } from "../context/auth-context";

const AuthenticateApp = lazy(
  () => import(/* webpackPrefecth: true */ "../components/AuthenticatedApp")
);
const PublicApp = lazy(() => import("../components/PublicApp"));

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <React.Suspense fallback>
      {user ? <AuthenticateApp /> : <PublicApp />}
    </React.Suspense>
  );
};
