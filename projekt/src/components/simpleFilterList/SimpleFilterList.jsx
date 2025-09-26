"use client"
import { useEffect, useState } from "react"
import "./simpleFilterList.scss"
export default function SimpleFilterList({elements, setState, state, searhState}){

const [selected, setSelected] = useState(null)
    








    return(

        <ul className="simpleFilter">

        {elements?.map(element=>{
            return <li key={element.name}  className={"simpleFilter__listItem" }><button onClick={(e)=>{
                //laver en filter på alle values
              
             
               setState(element)
               setSelected(element)
              
             
               
               
            }} className={  selected?.name == element?.name ?"simpleFilter__button simpleFilter__button--active": "simpleFilter__button" }>{element.name}</button></li>
        })}
        </ul>
    )

}