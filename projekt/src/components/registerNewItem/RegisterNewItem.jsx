"use client"
import { useActionState, useEffect } from "react"
import FormComponent from "../formComponent/FormComponent"
import registerNewListingAction from "@/actions/registerNewListingAction"
import { useRouter } from "next/navigation"


export default function RegisterNewItem(){
    const router = useRouter()
    const [registerState, registerAction, isPending] =  useActionState(registerNewListingAction, {})

    useEffect(()=>{
        if(registerState?.success){
            router.push("/profile/items")
        }
console.log(registerState)
    }, [registerState])


    const inputs = [{name :"title", label: "Title"}, {name: "description", label: "description", type:"textarea"}, {name: "img", label: "Image", type: "file"}]
        return(
            <>
            <h1 className="defaultHeading">Register new Item</h1>
            <FormComponent isPending={isPending} action={registerAction} actionstate={registerState} inputs={inputs}></FormComponent>
            </>
    
        )
       
    
}