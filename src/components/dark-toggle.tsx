"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
 
export default function ModeToggle() {
  const { setTheme, theme } = useTheme()
  
  const updateTheme =  () => {
    setTheme(theme=== "light" ? "dark" : "light")
  }
  
  return (


    <Toggle aria-label="Toggle italic" onClick={updateTheme} className="-m-2">
       <Sun className="text-white dark:z-40"/>
       <Moon className={theme ==="ligth" ? "invisible hidden ":"text-black -m-6" }/> 
    </Toggle>
    
  )
}