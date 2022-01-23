import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Page Not Found</h1>
      <p>
        Sorry, that page could not be found. Return to <Link to="/">Home</Link>
      </p>
    </div>
  );
};
