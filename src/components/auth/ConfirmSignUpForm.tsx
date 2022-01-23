import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { Button } from "../lib";

type ConfirmSignUpFormValues = {
  code: string;
};

export const ConfirmSignUpForm = () => {
  const { confirmSignUp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmSignUpFormValues>();

  const onSubmit = (data: any) => {
    let username = location.search.split("=")[1];
    console.log(username);
    console.log(data);
    confirmSignUp(username, data.code).then((status) => {
      switch (status) {
        case "SUCCESS":
          navigate({ pathname: "/sign-in" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Verify Code</h2>
      <div className="mb-6">
        <label htmlFor="verificationCode">
          We sent you a 6 digit confirmation code. Please check your email
        </label>
        <input
          type="text"
          className="mt-8"
          {...register("code", {
            required: {
              value: true,
              message: "Please enter a valid confirmation code",
            },
          })}
        />
        {errors.code && (
          <span className="text-red-900">{errors.code.message}</span>
        )}
      </div>
      <div>
        <Button className="mb-4" type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};
function setVerifiedUsername(username: string[]) {
  throw new Error("Function not implemented.");
}
