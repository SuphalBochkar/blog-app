import {
  FieldError,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userZodSigninT } from "@finish66/medium-common";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

interface LabeledProps {
  label: string;
  type: string;
  register: UseFormRegister<userZodSigninT>;
  registerName: keyof userZodSigninT;
  options?: RegisterOptions<userZodSigninT>;
  errors: FieldError | undefined;
}

export default function LeftSignin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userZodSigninT>();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const onSubmit: SubmitHandler<userZodSigninT> = async (data) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${url}/user/signin`, data);
      if (response.data.success) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        toast.success(response.data.message);
        setAuthUser(token);
        navigate("/blogs");
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response)
          toast.error(error.response.data.error || "An error occurred");
        else toast.error("Error: " + error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center mb-10">
          <div className="text-4xl font-bold m-1">Signin into your account</div>
          <div className="text-lg font-medium text-slate-600 m-1">
            Don't have an account?
            <Link to={"/signup"} className="underline pl-2">
              Signup
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabeledInput
            label="Email"
            type="email"
            register={register}
            registerName="email"
            errors={errors.email}
            options={{
              required: "Enter Email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            }}
          />
          <LabeledInput
            label="Password"
            type="password"
            register={register}
            registerName="password"
            errors={errors.password}
            options={{
              required: "Enter Password",
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-medium rounded-lg text-sm text-white px-5 py-2.5 me-2 mb-2 transition-colors focus:outline-none ${
              isSubmitting
                ? "bg-slate-300 text-slate-800 cursor-not-allowed"
                : "bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300"
            } flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Signin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export function LabeledInput({
  label,
  type,
  register,
  registerName,
  errors,
  options,
}: LabeledProps) {
  const borderColor = errors ? "border-red-500" : "border-gray-200";
  const focusBorderColor = errors ? "border-red-500" : "border-gray-900";

  return (
    <div className="mb-5">
      <div className="relative w-full min-w-[300px] h-10">
        <input
          {...register(registerName, options)}
          type={type}
          placeholder=" "
          className={`peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] ${borderColor} focus:${focusBorderColor}`}
        />
        <label
          className={`flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!${borderColor} after:border-blue-gray-200 peer-focus:after:${focusBorderColor}`}
        >
          {label}
        </label>
      </div>
      {errors && (
        <p className="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 -mt-px"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {errors.message}
        </p>
      )}
    </div>
  );
}
