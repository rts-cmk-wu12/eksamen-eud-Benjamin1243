"use server"

import fetcher from "@/utils/fetcher"
import { headers } from "next/headers"
import z from "zod"

export default async function resgisterUser(prevstate, formData){
console.log(formData)

const {firstname,lastname,email,password} = Object.fromEntries(formData)
    
      const RegisterUser = z.object({
        email: z.email(("Du skal skrive en mail her")).min(1,"du skal skrive noget i mail"),
        password: z.string().min(4,"Et password skal være på midst 4 tegn"),
        firstname: z.string("Du kan ikke hedde et tal").min(1,"Dit navn skal mindst være på et bogstav"),
        lastname: z.string("Du kan ikke hedde et tal").min(1,"Dit navn skal mindst være på et bogstav")

      })

       const validatedRegisterUser = RegisterUser.safeParse({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname
  })

  if(!validatedRegisterUser.success){
     
        return{
            success:validatedRegisterUser.success,
            errors: z.treeifyError(validatedRegisterUser.error),
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
    
    
        }
    }

const jsonObject = JSON.stringify({
    email: validatedRegisterUser.data.email,
    password: validatedRegisterUser.data.password,
    firstname: validatedRegisterUser.data.firstname,
    lastname: validatedRegisterUser.data.lastname,


})

    const data = await fetcher("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, 
        body: jsonObject
    })
if(data?.responseCode == 500){
    return{
          success: false,
          errors: {properties:{ all: ["Der skete en fejl på serveren prøv igen"]}},
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
  
  
      }
  }
  return{
          success: true,
         successMessage: "Alt gik godt, du er nu oprettet " + data.firstname+ " " + data.lastname + " Du bliver sendt videre til login", 
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
  
  
      }

  console.log(data)
}