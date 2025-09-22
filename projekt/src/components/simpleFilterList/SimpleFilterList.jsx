"use client"
import "./simpleFilterList.scss"
export default function SimpleFilterList({elements, setState, state}){

    return(

        <ul className="simpleFilter">

        {elements?.map(element=>{
            return <li key={element} className="simpleFilter__listItem"><button onClick={(e)=>{
                
            }} className="simpleFilter__button">{element}</button></li>
        })}
        </ul>
    )

}