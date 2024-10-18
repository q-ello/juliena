"use client";
import { useState, useEffect, useRef, LegacyRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { link } from "fs";

// Interface for image data
interface GameData {
    videoSrc: string,
    name: string,
    description: string,
    stack: string,
    forDownload: boolean,
    link: string,
    githubLink?: string
}

// Image data array
const games: GameData[] = [
    {
        videoSrc: "/gameplayVids/chernograd.mov",
        name: "CHERNOGRAD",
        description: "Инди-проект, который мы делаем с ребятами из потока. На мне были: система интерактивности, система рекордера, субтитры, UI для туториала, простые анимации и ещё по мелочи.",
        stack: "Unreal Engine, Blueprints",
        forDownload: false,
        link: "https://store.steampowered.com/app/3047300/CHERNOGRAD/"
    },
    {
        videoSrc: "/gameplayVids/Dino's Battle.mp4",
        name: "Dino's Battle",
        description: "Учебный проект. Полностью поддерживает как ввод только с клавиатуры, так и только с мыши, для удобства игрока.",
        stack: "C++, SFML",
        forDownload: true,
        link: "/filesToDownload/Dinos.zip",
        githubLink: "https://github.com/q-ello/graphic-dinos"
    },
    {
        videoSrc: "/gameplayVids/Clone Master.mp4",
        name: "Clone Master",
        description: "Консольная игрушка в стиле MUD, сделанная наподобие игры Zork. Контент ещё будет дополняться.",
        stack: "C++",
        forDownload: true,
        link: "/filesToDownload/CloneMaster.zip",
        githubLink: "https://github.com/q-ello/Clone-Master"
    },
    {
        videoSrc: "/gameplayVids/Bewre the Rectangle.mp4",
        name: "Beware the Rectangle",
        description: "Простая игра, где главная задача: уклоняться от платформы. Сделана в процессе изучения GLSL.",
        stack: "GLSL",
        forDownload: false,
        link: "https://www.shadertoy.com/view/4Xfczl"
    },
    {
        videoSrc: "/gameplayVids/Flappy Bird.mp4",
        name: "Flappy Bird",
        description: "Проект, сделанный в процессе изучения Javascript.",
        stack: "Javascript",
        forDownload: false,
        link: "https://q-ello.github.io/flappy-bird/",
        githubLink: "https://github.com/q-ello/flappy-bird"
    },
    {
        videoSrc: "/gameplayVids/Snake.mp4",
        name: "Snake",
        description: "Простенькая игра, сделанная в процессе изучения ООП и JS.",
        stack: "Javascript",
        forDownload: false,
        link: "https://q-ello.github.io/snake/",
        githubLink: "https://github.com/q-ello/snake"
    }
];

export default function GameSlider(): JSX.Element {
    // State to keep track of the current image index
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // State to determine if the image is being hovered over
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Function to show the previous slide
    const prevSlide = (): void => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + games.length) % games.length
        );
    };

    // Function to show the next slide
    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    };


    // Handle mouse over event
    const handleMouseOver = (): void => {
        setIsHovered(true);
    };

    // Handle mouse leave event
    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };

    const nameClassname = "text-2xl text-zinc-800 bg-zinc-300 px-5 py-1 mb-4"
    const infoClassname = "text-lg text-zinc-700 bg-zinc-200 px-5 py-0.5 mb-1"
    const linkClassname = infoClassname + " hover:bg-zinc-300 hover:text-zinc-500"

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {    
        videoRef.current?.load();
      }, [currentIndex]);

    return (
        <div className="relative w-full mx-auto mt-4">
            <div
                className="relative h-[460px] mx-12 group"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex my-0 mx-auto p-20 gap-10 justify-center">
                    <video autoPlay controls className="w-96 h-64" ref={videoRef}>
                        <source src={games[currentIndex].videoSrc} />
                    </video>
                    <div className="max-w-96">
                        <h2 className={nameClassname}>{games[currentIndex].name}</h2>
                        <p className={infoClassname}>Стек: {games[currentIndex].stack}</p>
                        <p className={infoClassname}>{games[currentIndex].description}</p>
                        {games[currentIndex].githubLink && <div className={linkClassname}><a href={games[currentIndex].githubLink} target="_blank">Ссылка на гитхаб</a></div>}
                        <div className={linkClassname}><a href={games[currentIndex].link} download={games[currentIndex].forDownload} target="_blank">
                            {games[currentIndex].forDownload ? "СКАЧАТЬ" : "ИГРАТЬ"}
                        </a></div>
                    </div>
                </div>
            </div>
            <button
                className="absolute left-0 top-1/2 transform h-[459px] rounded-xl hover:bg-zinc-300 mx-1 -mt-[10px] -translate-y-1/2 bg-zinc-200 text-white p-2 group"
                onClick={prevSlide}
            >
                <ChevronLeft className="text-gray-400 group-hover:text-white" />
            </button>
            <button
                className="absolute right-0 top-1/2 transform h-[459px] rounded-xl hover:bg-zinc-300 mx-1 -mt-[10px] -translate-y-1/2 bg-zinc-200 text-white p-2 group"
                onClick={nextSlide}
            >
                <ChevronRight className="text-gray-400 group-hover:text-white" />
            </button>
            <div className="flex justify-center mt-4">
                {games.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-10 mx-1 ${index === currentIndex
                            ? "bg-[#beff46] rounded-xl"
                            : "bg-gray-300 rounded-xl"
                            } transition-all duration-500 ease-in-out`}
                    ></div>
                ))}
            </div>
        </div>
    );
}