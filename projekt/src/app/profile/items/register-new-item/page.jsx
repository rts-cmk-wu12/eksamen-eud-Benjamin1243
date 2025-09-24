import FormComponent from "@/components/formComponent/FormComponent";

export default function RegisterNewItem(){
const inputs = [{name :"title", label: "Title"}, {name: "description", label: "description", type:"text"}]
    return(
        <>
        <h1>Register new Item</h1>
        <FormComponent inputs={inputs}></FormComponent>
        </>

    )
   
}