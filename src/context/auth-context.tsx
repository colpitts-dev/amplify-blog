import { useState, useEffect, createContext, useContext, lazy } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { HubCallback } from "@aws-amplify/core/lib/Hub";
import {
  CognitoAccessToken,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

import aws_exports from "../aws-exports";
import { useNavigate } from "react-router-dom";

Amplify.configure(aws_exports);

interface IUser {
  username: string;
  email: string;
  token: CognitoAccessToken;
}

interface IAuthContext {
  user: IUser | null;
  signUp(
    username: string,
    password: string,
    email: string,
    phone: string
  ): Promise<IUser>;
  signIn(username: string, password: string): Promise<CognitoUser>;
  signOut(): Promise<any>;
  confirmSignUp(username: string, confirmationCode: string): Promise<any>;
}

const signIn = (username: string, password: string): Promise<CognitoUser> =>
  Auth.signIn(username, password);

const signUp = (
  username: string,
  password: string,
  email: string,
  phone: string
): Promise<any> => Auth.signUp(username, password, email, phone);

const signOut = (): Promise<any> => Auth.signOut();

const confirmSignUp = (
  username: string,
  confirmationCode: string
): Promise<any> => Auth.confirmSignUp(username, confirmationCode);

const getSession = (): Promise<CognitoUserSession | null> =>
  Auth.currentSession();

export const useCognito = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  const authListener: HubCallback = ({ payload: { event, data } }) => {
    console.log("COGNITO EVENT\n - ", event);

    switch (event) {
      case "signIn":
        setUser({
          username: data.username,
          token: data.signInUserSession.accessToken,
          email: data.attributes.email,
        });
        navigate({ pathname: "/" });
        break;
      case "signOut":
        setUser(null);
        break;
    }
  };

  useEffect(() => {
    console.log("AUTH CONTEXT MOUNTED");
    const loadCognito = async () => {
      try {
        const session = await getSession();
        if (session && session.isValid()) {
          Auth.currentUserInfo().then((user: any) => {
            setUser({
              email: user.attributes.email,
              username: user.username,
              token: session.getAccessToken(),
            });
          });
        }
      } catch (e) {
        console.log("- no user session found");
      }
    };
    loadCognito();
  }, []);

  useEffect(() => {
    console.log("- listening for cognito user events");
    Hub.listen("auth", authListener);
    return () => Hub.remove("auth", authListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, signUp, signIn, signOut, confirmSignUp };
};

const AuthContext = createContext<IAuthContext>({
  user: null,
  signUp,
  signIn,
  signOut,
  confirmSignUp,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useCognito();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
