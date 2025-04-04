import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {

  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

//   const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const {
    mutate, 
    isLoading,
  } = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="min-h-[500px] flex flex-col gap-y-3 items-center" onSubmit={onSubmit}>
      {/* Heading section */}
      <h2 className="form-heading">Sign In</h2>
      {/* Form section */}
      <div className="flex flex-col flex-1 gap-y-7 max-w-[500px]">
          {/* Email input field */}
          <label className="input-label">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("email", { required: "This field is required" })}
            />
            {
              errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )
            }
          </label>
          {/* Password input field */}
          <label className="input-label">
            Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {
              errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )
            }
          </label>
          {/* Not registered link */}
          <div className="flex flex-col items-center justify-between gap-y-10">
            <span className="text-sm">
              Not Registered?{" "}
              <Link className="link" to="/register">
                Create an account here
              </Link>
            </span>
            <button
              disabled={isLoading}
              type="submit"
              className="btn-blue w-full "
            >
              {
                isLoading ? <AiOutlineLoading3Quarters className="w-full animate-spin"/>
                : "Login"
              }
            </button>
          </div>
      </div>
    </form>
  );

};

export default SignIn;