"use client"
import { useActionState, useEffect } from "react";

import InputComponent from "../inputComponent/InputComponent";
import "./formComponent.scss"


export default function FormComponent({inputs, action, actionstate, isPending, submitText = "Sign in", submitLoadText = "Signer in...."}){
     
     




    return(
        <form action={action } className="loginForm">
            { actionstate?.errors?.properties?.all?.[0]&&<span className="loginForm__fail">{actionstate?.errors?.properties?.all?.[0] }</span>}
             { actionstate?.successMessage&& <span className="loginForm__success">{actionstate.successMessage }</span>}
            {inputs.map((input, index)=>{
                return  <InputComponent  key={input.name + index} type={input.type} name={input.name} error={actionstate?.errors?.properties?.[input.name]?.errors?.[0]} defualtVal={input.defualtVal ? input.defualtVal :actionstate?.[input.name] }  label={input.label}></InputComponent>

            })}
           
       
         <input className="loginForm__submit" type="submit" defaultValue={ isPending ?submitLoadText: submitText}  />


        </form>
    )
}