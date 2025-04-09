"use client";


import LogOutComponent from "@/components/signOut";

export default function HeadersDashBoard(props) {

  return (
    <div className="w-screen h-[6vh] bg-red-50 flex px-2 md:px-24 justify-between">
      <div className="h-full w-12 flex justify-center items-center p-1">
        <img className="rounded-full w-full h-full" src={props.imageUser} alt="user image" />
      </div>

      <div className="flex items-center justify-center">
        <h2 className="text-sm">{props.nameUser}</h2>
      </div>

      <div className="h-full w-12 flex justify-center items-center p-1">
        <LogOutComponent />
      </div>
    </div>
  )

}
