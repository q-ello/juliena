'use client'
import { SyntheticEvent, useState } from "react";
import GameSlider from "./Components/Carousel/Carousel";

export default function Home() {
  const [welcoming, setWelcoming] = useState<boolean>(true)

  const showMainPage = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    setWelcoming(false)
  }

  const h3ClassName = "text-3xl text-zinc-700 bg-zinc-300 rounded px-8 py-2"

  const pClassName = "text-2xl text-zinc-800 bg-zinc-200 rounded px-8 py-2"

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-16 relative overflow-hidden">
      <div className={`${welcoming ? "opacity-100" : "opacity-0"} z-2 pointer-events-none transition-opacity duration-1000 absolute top-0 w-full h-full bg-white`}></div>
      <h1 className="text-4xl mt-12 text-center text-zinc-900 bg-zinc-300 rounded px-8 py-2" >Привет! Меня зовут<br/> Жульена</h1>
      <h3 className={h3ClassName}>Обо мне</h3>
      <p className={pClassName}>
        Учусь в ИТМО на факультете <abbr title="Школа разработки видеоигр">ШРВ</abbr>. Специальность: разработка видеоигр.<br/>
        В основном пишу на C++, но также знаю и другие языки - например, Typescript, Python, SQL, пародию на ассемблер, 
        используемую для управления локальной ЭВМ нашего универа. На каждом из них делала проекты.
        С мая 2024 года работаю c Unreal Engine.
        Люблю делать игрушки - в первую очередь прописывать геймплейную логику.
      </p>
      <h3 className={h3ClassName}>Мои проекты</h3>
      
      <GameSlider/>

      <video autoPlay muted onEnded={showMainPage} className={`${welcoming ? "w-1/2 h-1/2 translate-x-0 scale-100" : "w-1/4 h-1/4 translate-x-96 scale-75"} ${welcoming ? "" : "h-1/2"}  absolute top-0 transition-all duration-1000`}>
        <source src="/Приветствие.mp4" />
      </video>
    </main>
  );
}
