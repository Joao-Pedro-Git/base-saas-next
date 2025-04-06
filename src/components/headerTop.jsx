"use client";

import { ShinyButton } from "./magicui/shiny-button";
import { WordRotate } from "./magicui/word-rotate";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";


export default function HeaderTop(props) {
  const [darkMode, setDarkMode] = useState(false);
  const darkModeChange = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  }

  function goLogin() {
    window.location.href = "/login";
  }

  return (
    <div className="w-screen h-16 flex items-center md:px-28 py-4 justify-between fixed headerTop bg-white dark:bg-[#09090B]">
      <div className="ml-4 md:w-auto px-4 bg-gray-100 dark:bg-black h-full rounded-full border-neutral-950 border-0 flex flex-shrink-0 ">
        {props.logo}
        <WordRotate
          className="text-2xl font-bold md:text-3xl mt-[-8px]"
          words={["a", "b", "c"]}
        />
      </div>
      <div className="w-auto gap-2 flex absolute right-4 md:right-44" >
        <button
          onClick={darkModeChange}
          className="p-2 rounded-full transition-all duration-500 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun size={20} color="#FACC15" /> : <Moon size={20} color="#6B7280" />}
        </button>
        <ShinyButton className="whitespace-nowrap flex" onClick={goLogin}>
          {props.btnMessage}
        </ShinyButton>
      </div>
    </div >

  )

}