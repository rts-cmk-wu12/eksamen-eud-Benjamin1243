import "./inputComponent.scss"
export default function InputComponent({name, label = name, error = "", type = "text", defualtVal = ""}){
    return(
        <label htmlFor={name} className="inputComponent">
            {type == "hidden" ? "":label}

        {type == "textarea"? <textarea placeholder={label} defaultValue={defualtVal}  className="inputComponent__textarea" name={name} id=""></textarea>:<input className="inputComponent__input" defaultValue={defualtVal} placeholder={label} name={name} type={type} />}
        <span className="inputComponent__error">{error}</span>
        </label>
    )
}