import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/auth-context";
import { Button } from "../lib";

type SignUpFormValues = {
  username: string;
  password: string;
  email: string;
  phone: string;
};

export const SignUpForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const onSubmit = (data: SignUpFormValues) => {
    const { username, password, email, phone } = data;
    signUp(username, password, email, phone).then((user) => {
      console.log(user);
      navigate({ pathname: "/verify-email", search: `email=${user.email}` });
    });
  };

  return (
    <form className="mb-12" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-4">Sign Up Form</h2>

      <div className="flex flex-col mb-5">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="invalid:border-red-700"
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
      <div className="flex flex-col mb-5">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "Please provide a valid email." },
          })}
        />
        {errors.email && (
          <span className="text-red-900">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col hidden mb-5">
        <label htmlFor="phone">Phone</label>
        <input type="phone" name="phone" defaultValue="18005551234" />
      </div>
      <div>
        <Button className="mb-6" type="submit">
          Sign Up
        </Button>
        <p>
          Already have an account? Sign in <Link to="/sign-in">here</Link>
        </p>
      </div>
    </form>
  );
};
