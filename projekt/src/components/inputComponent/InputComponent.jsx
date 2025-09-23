import "./inputComponent.scss"
export default function InputComponent({name, label = name, error = "", type = "text", defualtVal = ""}){
    return(
        <label htmlFor={name} className="inputComponent">
            {label}

        <input className="inputComponent__input" defaultValue={defualtVal} placeholder={label} name={name} type={type} />
        <span className="inputComponent__error">{error}</span>
        </label>
    )
}