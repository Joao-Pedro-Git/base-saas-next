"use client";

import CardInput from "@/app/login/cardLogin";

export default function Registrar() {
  return (
    <div className="w-screen h-[100vh] grid grid-clos-2 md:grid-clos-1 md:grid-flow-col">
      <div className="w-full h-full bg-black ">
        <iframe
          className="w-full h-full object-cover blur-[2px]"
          src="https://www.youtube.com/embed/KQoZMAuFhww?autoplay=1&loop=1&playlist=KQoZMAuFhww&controls=0&mute=1&modestbranding=1&rel=0&showinfo=0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full h-full bg-[--cor-p] flex justify-center items-center">
        <CardInput
          logotitle="Insira suas credenciais para criar sua nova conta."
          inputName={true}
          showBtnsLow={false}
          showBtnGoogle={false}
          register={true}
        />
      </div>
    </div>
  );
}
