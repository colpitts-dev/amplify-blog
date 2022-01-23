import { useCognito, useAuth } from "../context/auth-context";
import { Button, Footer } from "./lib";

const AuthenticatedApp: React.FC = ({ children }) => {
  const { signOut } = useAuth();
  const { user } = useCognito();
  console.log("AUTHENTICATED APP LOADED\n - ", user);

  return (
    <article>
      <header>
        <h1>Private Dashboard</h1>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </header>
      <main>{children}</main>
      <Footer />
    </article>
  );
};

export default AuthenticatedApp;
