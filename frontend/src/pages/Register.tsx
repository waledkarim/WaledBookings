import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import * as apiCient from "../api-client";
import { useAppContext } from "../contexts/AppContext.tsx";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};


//todo: fix the UI.
const Register = () => {

  
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  
  const mutation = useMutation(apiCient.register, {
    onMutate: () => {
      showToast({message: "PLease wait", type: "LOADING"});
    },
    onSuccess: async () => {
      showToast({message: "Registration Successful", type: "SUCCESS"});
      await queryClient.invalidateQueries("validateToken");
      // navigate("/");
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: "ERROR"});
    },
  });

  const onSubmit = handleSubmit((data) => {
      mutation.mutate(data);
  });

  return (
      <form className="flex flex-col" onSubmit={onSubmit}>
        <h2 className="text-lg font-bold text-center">Create an Account</h2>
        {/* First name and Last name input fields */}
        <div className="flex flex-col md:flex-row gap-5">
          <label className="input-label">
            First Name
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("firstName", { required: "This field is required" })}
            />
          </label>
          {
              errors.firstName && (
                  <span className="text-red-500">{errors.firstName.message}</span>
                )
          }
          <label className="input-label">
            Last Name
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastName", { required: "This field is required" })}
            />
          </label>
          {
              errors.lastName && (
                  <span className="text-red-500">{errors.lastName.message}</span>
                )
          }
        </div>
        <label className="input-label">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          />
        </label>
        {
          errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )
        }
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
        </label>
        {
          errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )
        }
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
        </label>
        {
          errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword.message}</span>
            )
        }
        <div className="text-center">
          <button
            type="submit"
            className="btn-blue"
          >
            Create Account
          </button>
        </div>
      </form>
  );
}

export default Register;