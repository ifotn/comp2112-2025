"use client";


import { useForm } from "react-hook-form";
import PageTitle from "@/app/components/PageTitle";
import { useState } from "react";

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

    const onSubmit = (data: LoginForm) => {
        setMessage('Logging in...')
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


