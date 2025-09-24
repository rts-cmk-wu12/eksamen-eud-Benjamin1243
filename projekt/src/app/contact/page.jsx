"use client"
import newsletterSignup from "@/actions/newsletterSignUp";
import FormComponent from "@/components/formComponent/FormComponent";
import { useActionState } from "react";

export default function Contact(){
    const inputs = [{name: "email", label: "Email"}]
    const [tilmeldState, tilmeldAction, isPending] = useActionState(newsletterSignup, {})
    return(
        <>
        <h1 className="contactHeading">Tilmeld dig vores nyhedsBrev</h1>
        { tilmeldState?.success ? <p>{tilmeldState.successMessage}</p>: ""}
        <FormComponent isPending={isPending} actionstate={tilmeldState} action={tilmeldAction} submitText="Tilmeld" submitLoadText="Tilmelder" inputs={inputs}></FormComponent>
        </>
        
    )
}