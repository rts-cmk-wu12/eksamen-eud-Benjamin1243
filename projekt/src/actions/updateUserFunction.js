"use server"
import fetcher from "@/utils/fetcher"
import { cookies } from "next/headers"
import z from "zod"
export default async function updateUserFunction(prevState, formData){
    const {firstname,lastname,email,password} = Object.fromEntries(formData)
    
      const UpdateUserSchema = z.object({
        email: z.email(("Du skal skrive en mail her")).min(1,"du skal skrive noget i mail"),
        password: z.string().min(1,"du skal skrive password"),
        firstname: z.string("Du kan ikke hedde et tal").min(1,"Dit navn skal mindst være på et bogstav"),
        lastname: z.string("Du kan ikke hedde et tal").min(1,"Dit navn skal mindst være på et bogstav")

      })

       const validatedUpdateUserSchema = UpdateUserSchema.safeParse({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname
  })

  if(!validatedUpdateUserSchema.success){
      console.log("sender nu")
      return{
          success:validatedUpdateUserSchema.success,
          errors: z.treeifyError(validatedUpdateUserSchema.error),
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
  
  
      }
  }
  console.log(validatedUpdateUserSchema)
  const cookieStore = await cookies()

  const jsonObject = JSON.stringify({
    email: validatedUpdateUserSchema.data.email,
    firstname: validatedUpdateUserSchema.data.firstname,
    lastname: validatedUpdateUserSchema.data.lastname,
    password:validatedUpdateUserSchema.data.password

  })
  const data = await fetcher("http://localhost:4000/api/v1/users/" + cookieStore.get("user_id").value, {
    method: "PUT",
    headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + cookieStore.get("sh_token").value
  },
  body: jsonObject
  } )

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
         successMessage: "Alt gik godt, dine oplysniger er nu ændret " + firstname+ " " + lastname, 
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
  
  
      }



  console.log(data)

    
   

}