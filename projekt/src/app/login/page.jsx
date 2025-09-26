import LoginPageContent from "@/components/loginPageContent/LoginPageContent";

export const metadata = {
  title: 'Login ',
}
export default function Login(){

   return(
    <>
    <h1 className="defaultHeading">Log in</h1>
    <LoginPageContent></LoginPageContent>
    </>
   )
   
   }
