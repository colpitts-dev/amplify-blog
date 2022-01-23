import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth-context";
import { Button } from "../lib";

type SignInFormValues = {
  username: string;
  password: string;
};

export const SignInForm = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const onSubmit = (data: any) => {
    const { username, password } = data;
    signIn(username, password);
  };

  return (
    <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-4">Sign In Form</h2>

      <div className="flex flex-col">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Please provide a valid username",
            },
          })}
        />
        {errors.username && (
          <span className="text-red-900">{errors.username.message}</span>
        )}
      </div>
      <div className="flex flex-col mb-5">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Please provide a valid password",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-900">{errors.password.message}</span>
        )}
      </div>
      <div>
        <Button className="mb-4" type="submit">
          Sign In
        </Button>
        <p>
          Don't have an account? Sign up <Link to="/sign-up">here</Link>
        </p>
      </div>
    </form>
  );
};
