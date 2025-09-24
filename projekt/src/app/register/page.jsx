"use client"
import resgisterUser from "@/actions/registerUser";
import FormComponent from "@/components/formComponent/FormComponent";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Register(){
    const inputs = [{name: "email", label: "Email"}, {name: "password", label: "Password", type: "password"}, {name: "firstname", label: "Firstname"}, {name: "lastname", label: "Lastname"}]
    const [registerState, registerAction, isPending] = useActionState(resgisterUser, {})
    const router = useRouter();
    useEffect(()=>{
        if(registerState.success){
            setTimeout(()=>{
                router.push("/login")
            }, 2000)
        }
    }, [registerState])
    return(
        <>
    <h1 className="registerHeading">Register</h1>
    <FormComponent isPending={isPending} actionstate={registerState} action={registerAction} inputs={inputs}></FormComponent>
    </>
    )
} 