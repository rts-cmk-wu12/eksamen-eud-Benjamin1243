"use client"
import "./searchComponent.scss"

import { useState } from "react"

export default function SearchComponent({setState}){
    const [value, setValue] = useState(null)
    return <input placeholder="Search" className="searchComponent" type="text" onInput={(e)=>{
       setState(e.target.value)
    }} />
}