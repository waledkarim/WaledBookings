import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import * as apiCient from "../api-client";
import { useAppContext } from "../contexts/AppContext.tsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {

  
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  
  const { mutate, isLoading } = useMutation(apiCient.register, {
    onSuccess: async () => {
      showToast({message: "Registration Successful", type: "SUCCESS"});
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"});
    },
  });

  const onSubmit = handleSubmit((data) => {
      mutate(data);
  });

  return (
      <form className="flex flex-col gap-y-3 items-center mb-28" onSubmit={onSubmit}>
        {/* Heading section */}
        <h2 className="form-heading">Create an Account</h2>
        {/* Forms Section */}
        <div className="flex flex-col gap-y-3 flex-1 max-w-[500px] pb-5 md:gap-y-6">
        {/* First name and Last name input fields */}
          <div className="flex flex-col md:flex-row gap-5">
            <label className="input-label md:flex-1">
              First Name
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("firstName", { required: "This field is required" })}
              />
            {
              errors.firstName && (
                  <span className="text-red-500">{errors.firstName.message}</span>
                )
            }
            </label>
            <label className="input-label md:flex-1">
              Last Name
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("lastName", { required: "This field is required" })}
              />
            {
              errors.lastName && (
                  <span className="text-red-500">{errors.lastName.message}</span>
                )
            }
            </label>
          </div>
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
          {/* Confirm password input field */}
          <label className="input-label">
            Confirm Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {
              errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword.message}</span>
                )
            }
          </label>
          {/* Create acc btn */}
          <div className="text-center">
            <button
            disabled={isLoading}
              type="submit"
              className="btn-blue w-full"
            >
              {
                isLoading ? <AiOutlineLoading3Quarters className="w-full animate-spin"/>
                : "Create an Account"
              }
            </button>
          </div>
        </div>
      </form>
  );
}

export default Register;