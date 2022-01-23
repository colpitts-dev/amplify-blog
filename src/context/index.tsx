import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth-context";

const AppProviders: React.FC = ({ children }) => {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );
};

export { AppProviders };
