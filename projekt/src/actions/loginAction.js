"use server";
import fetcher from "@/utils/fetcher";
import z from "zod"
export default async function loginAction(prevstate,formData){
    console.log("jejrj")
  const {email,password} = Object.fromEntries(formData)

  const LoginScheme = z.object({
    email: z.email(("Du skal skrive en mail her")).min(1,"du skal skrive noget i mail"),
    password: z.string().min(1,"du skal skrive password")
  })

  const validatedLogin = LoginScheme.safeParse({
    email: email,
    password: password
  })
console.log(validatedLogin)
  /*Guar clause*/
if(!validatedLogin.success){
    console.log("sender nu")
    return{
        success:validatedLogin.success,
        errors: z.treeifyError(validatedLogin.error),
        email: email,
        password: password,


    }
}
const jsonObject = JSON.stringify({
        "email": validatedLogin.data.email,
        "password": validatedLogin.data.password


    })

//hvis zod validation lykkedes, sender vi dataen til api'et for at logge ind

const user =  await fetcher("http://localhost:4000/auth/token", {
    "method": "POST",

  "headers": { "Content-Type": "application/json" },
   "body": jsonObject
})
console.log(user.responseCode, "ereurueruuu")

// i fremtiden skal dette sættes ind på fetcher funktionen istedet
if(user.responseCode == 500){
    return{
        success:false,
        errors: {properties:{ all: ["Der skete en fejl på serveren...prøv igen"]}},
     email: email,
        password: password,
    }
}
if(user.responseCode == 401){
    return{
        success:false,
        errors: {properties:{ all: ["Denne bruger findes desværre ikke"]}},
     email: email,
        password: password,
    }
}
 console.log("user :",user)
return{
     success:true,
        errors:{},
     email: email,
        password: password,
    }

   
}





  

    

