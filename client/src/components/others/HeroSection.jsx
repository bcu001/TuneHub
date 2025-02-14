import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import featuredSongs from "@/database/featuredSongs.json";

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide(
                (currentSlide) => (currentSlide + 1) % featuredSongs.length
            );
        }, 5000);
        return () => clearTimeout(timer);
    });

    const nextSlide = () => {
        setCurrentSlide((currentSlide) => (currentSlide + 1) % featuredSongs.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide) => (currentSlide - 1 + featuredSongs.length) % featuredSongs.length);
    };
    return (
        <div className="relative w-full h-full  bg-white">
            <div className="">
                {featuredSongs.map((song, index) => (
                    <div
                        key={song.id}
                        className={`absolute h-full w-full inset-0 duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}

                    >
                        <img
                            src={song.image}
                            alt={song.title}
                            className="h-full  w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75" />
                        <div className="absolute bottom-5 left-0 right-0 p-8 text-white">
                            <h2 className="text-4xl font-bold mb-2 truncate">{song.title}</h2>
                            <p className="text-xl mb-4 truncate">{song.artist}</p>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => { console.log(song.title) }}>
                                Play Now
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {featuredSongs.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-400"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
