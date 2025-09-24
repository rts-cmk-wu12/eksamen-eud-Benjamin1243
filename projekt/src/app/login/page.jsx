"use client"
import loginAction from "@/actions/loginAction";
import FormComponent from "@/components/formComponent/FormComponent";
import LoginComponent from "@/components/formComponent/FormComponent";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Login(){

    const router = useRouter()
   
   
       const [login, loginFormAction, isPending] = useActionState(loginAction, {})
   console.log(login)
       useEffect(()=>{
           if(login?.success == true){
                router.push('/profile')
           }
   
       }, [login] )
   
       return(
           <FormComponent actionstate={login} isPending={isPending} action={loginFormAction} inputs={[{name: "email", label: "Email"}, {name: "password", label: "password", type: "password"}, ]}>

           </FormComponent>
       )
   }
