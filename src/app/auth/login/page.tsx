"use client";


import { useForm } from "react-hook-form";
import PageTitle from "@/app/components/PageTitle";
import { useState } from "react";
import { useCounter } from "@/app/context/GlobalContext";

type LoginForm = {
    username: string;
    password: string;
}

export default function Login() {
    
    //state variable with message to display to user
    const [message, setMessage] = useState('Please enter your credentials')
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<LoginForm>();

    // global context so we can set the username on login success
    const { setUsername } = useCounter();

    const onSubmit = async (data: LoginForm) => {
        //setMessage('Logging in...')
        const apiDomain: string = process.env.NEXT_PUBLIC_API_DOMAIN!;

        try {
            const response: Response = await fetch(`${apiDomain}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                })
            });

            // evaluate login attempt response
            if (response.ok) {
                console.log(response.json());
                setUsername(data.username);  // set username globally from form value if logged in
            }
            else {
                setMessage('Invalid Login');
                console.log(response.json());
            }
        }
        catch (error) {
            console.log(`Login Error: ${error}`);
        }
    };

    return (
        <main>
            <PageTitle title="Login"/>

            <h1>Login</h1>

            <div>{message}</div>
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
                    <input type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && (
                        <span className="error">{errors.password.message}</span>
                    )}  
                </fieldset>
                <button className="btn" disabled={isSubmitting}>Login</button>
            </form>
        </main>
    );
}    


