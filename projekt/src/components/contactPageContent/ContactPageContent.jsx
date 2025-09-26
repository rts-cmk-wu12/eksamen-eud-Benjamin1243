"use client"

import { useActionState } from "react"
import FormComponent from "../formComponent/FormComponent"
import newsletterSignup from "@/actions/newsletterSignUp"


export default function ContactPageContent(){

    const inputs = [{name: "email", label: "Email"}]
        const [tilmeldState, tilmeldAction, isPending] = useActionState(newsletterSignup, {})
        return(
            <>
            <h1 className="defaultHeading">Tilmeld dig vores nyhedsBrev</h1>
            { tilmeldState?.success ? <p>{tilmeldState.successMessage}</p>: ""}
            <FormComponent isPending={isPending} actionstate={tilmeldState} action={tilmeldAction} submitText="Tilmeld" submitLoadText="Tilmelder" inputs={inputs}></FormComponent>
            </>
            
        )
}