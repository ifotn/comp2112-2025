"use client";

import { useForm } from "react-hook-form";

interface RegisterFormData {
  username: string;
  password: string;
  confirm: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Success");
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <label>Username:</label>
          <input
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <input
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </fieldset>
        <fieldset>
          <label>Confirm Password:</label>
          <input
            {...register("confirm", {
              required: "Password Confirmation is required",
            })}
          />
          {errors.confirm && (
            <span className="error">{errors.confirm.message}</span>
          )}
        </fieldset>
        <button className="btn">Register</button>
      </form>
    </main>
  );
}
