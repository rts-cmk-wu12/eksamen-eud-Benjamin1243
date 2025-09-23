"use client"
import { useActionState, useEffect } from "react";

import InputComponent from "../inputComponent/InputComponent";
import "./loginComponent.scss"
import loginAction from "@/actions/loginAction";
export default function LoginComponent(){

    const [login, loginFormAction, isPending] = useActionState(loginAction, {})
console.log(login)
    useEffect(()=>{

    }, [login] )

    return(
        <form action={loginFormAction} className="loginForm">
            <span className="loginForm__fail">{login?.errors?.properties?.all?.[0]}</span>
           
       <InputComponent name="email" error={login?.errors?.properties?.email?.errors?.[0]} defualtVal={login?.email}  label={"Email"}></InputComponent>
         <InputComponent name="password" error={login?.errors?.properties?.password?.errors?.[0]}  type="password" defualtVal={login?.password} label={"password"}></InputComponent>
         <input className="loginForm__submit" type="submit" defaultValue={ isPending ?"signer in.... ": "Sign in"}  />


        </form>
    )
}