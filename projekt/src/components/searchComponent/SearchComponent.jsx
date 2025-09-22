"use client"
import "./searchComponent.scss"

import { useState } from "react"

export default function SearchComponent(){
    const [value, setValue] = useState(null)
    return <input placeholder="Search" className="searchComponent" type="text" onInput={(e)=>{
        setValue(e.target.value)
    }} />
}