"use server"
import fetcher from "@/utils/fetcher"
import { headers } from "next/headers"
import z, { json } from "zod"
export default async function newsletterSignup(prevstate, formdata){
const email = formdata.get("email")
console.log(email)
const SignUp = z.object({
        email: z.email(("Du skal skrive en mail her")).min(1,"du skal skrive noget i mail"),
       

      })

       const validatedSignUp = SignUp.safeParse({
    email: email,
  })

  if(!validatedSignUp.success){
        
        return{
            success:validatedSignUp.success,
            errors: z.treeifyError(validatedSignUp.error),
            email: email,
           
    
    
        }
    }
const jsonObject = JSON.stringify({
      email: validatedSignUp.data.email,
})

const response = await fetcher("http://localhost:4000/api/v1/newsletter", {
    method: "POST",
    headers : {
        'Content-Type': 'application/json'
    },
    body: jsonObject
}, true)

if(!response.status == 204){
    return{
     success:false,
        errors:{properties:{ all: ["noget gik galt på serverne...prøv igen, vi unskylder..."]}},
     email: email,
       
    }

}
return{
     success:true,
     successMessage: "alt gik perfekt, du er nu tilmeldt vores nyhedsbrev med " + email,
        errors:{},
     email: email,
        
    }



}