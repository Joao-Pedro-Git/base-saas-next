"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CardRegister from "../components/cardRegister";

export default function Login() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="w-screen h-[100vh] grid grid-cols-1 md:grid-cols-2 md:grid-flow-col">
      <div className="w-full h-full bg-black" data-aos="fade-up">
        <video
          className="w-full h-full object-cover blur-[2px]"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={false}
        >
          <source src="/loginVideo.webm" type="video/webm" />
        </video>
      </div>

      <div
        className="w-full h-full bg-[--cor-p] flex justify-center items-center py-8"
        data-aos="fade-down"
      >
        <CardRegister logotitle="Insira suas credenciais para criar sua nova conta." />
      </div>
    </div>
  );
}
