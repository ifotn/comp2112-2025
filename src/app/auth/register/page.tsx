"use client";

import { useForm } from "react-hook-form";
import PageTitle from "@/app/components/PageTitle";

interface RegisterFormData {
  username: string;
  password: string;
  confirm: string;
}

const getPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const passed = Object.values(checks).filter(Boolean).length;

  let label = 'Weak';
  if (passed >= 3) label = 'Medium';
  if (passed == 5) label = 'Strong';
  return { label, passed, checks };
}

export default function Register() {
  const {
    register,
    handleSubmit, watch, 
    formState: { errors, isSubmitSuccessful },
  } = useForm<RegisterFormData>();

  // password strength check
  const password = watch('password') || '';
  const { label, checks } = getPasswordStrength(password);

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password != data.confirm) {
      console.log("Passwords do not match");
    }
    else {
      try {
        // use fetch to POST new user to back-end API
        const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;
        const response: Response = await fetch(`${apiDomain}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password
          })
        });

        // check response from POST attempt
        const apiResponse: Response = await response.json();

        if (apiResponse.ok) {
          console.log(`Success: ${apiResponse}`);
        }
        else {
          console.log(`Registration Failed: ${apiResponse.text}`);
        }
      }
      catch(error) {
        console.log(`Registration Error: ${error}`);
      }     
    }
  };

  return (
    <main>
      <PageTitle title="Register" />
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
        <fieldset className="password-fieldset">
          <label>Password:</label>
          <div className="password-row">
            <div className="flex-1">
              <input type="text"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Min 8 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                      message: "Min 8 chars, 1 upper, 1 lower, 1 digit, 1 character"
                    }
                  })}
                />
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}
                <div className="strength-bar">
                  <div className={` strength-fill ${
                    label === 'Weak' ? "strength-weak" 
                    : label === 'Medium' ? "strength-medium"
                    : "strength-strong"
                  }`} >
                </div>
            </div>
            <p className="strength-label">Strength: {label}</p>
          </div>
          </div>
        </fieldset>
        <fieldset>
          <label>Confirm Password:</label>
          <input type="password"
            {...register("confirm", {
              required: "Password Confirmation is required",
              minLength: {
                value: 8,
                message: "Min 8 characters"
              }
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
