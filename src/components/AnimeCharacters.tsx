'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CharacterList = ({ animeId, limit }: { animeId: number, limit: number }) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    const handleButtonClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        router.push(`/anime/${animeId}/characters/all`);
      };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
            const data = await response.json();
            setCharacters(data.data);
            setLoading(false);
        };

        fetchData();
    }, [animeId]);

    return (
        <div className="flex flex-wrap items-center">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                limit && !isNaN(limit) && characters.length > 10 && characters.length > 0 ? ( // Check if limit exists and is a number
                    <>
                        {characters.slice(0, limit).map((char: { character: { mal_id: number; name: string; images: { jpg: { image_url: string; }; }; } }) => (
                            <Link href={`/anime/${animeId}/characters/${char.character.mal_id}`} key={char.character.mal_id} className="mr-10">
                                <div className="items-center">
                                    <div>
                                        <img className="rounded border-black border w-[100px] md:w-[150px] mx-auto" alt="charImage" src={char.character.images.jpg.image_url} />
                                    </div>
                                    <div className="text-center">
                                        <h1>{char.character.name}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <button className="rounded-full h-fit text-6xl transition duration-150 ease-in-out active:translate-y-1 active:shadow-md shadow-black" title="Show More" onClick={handleButtonClick}><FaRegArrowAltCircleRight/></button>
                    </>
                ) : (
                    characters.length === 0 ? (
                        <p>No characters.</p>
                    ) : (
                        characters.map((char: { character: { mal_id: number; name: string; images: { jpg: { image_url: string; }; }; } }) => (
                            <Link href={`/anime/${animeId}/characters/${char.character.mal_id}`} key={char.character.mal_id} className="p-6">
                                <div className="items-center">
                                    <div>
                                        <img className="rounded border-black border w-[100px] md:w-[150px] mx-auto" alt="charImage" src={char.character.images.jpg.image_url} />
                                    </div>
                                    <div className="text-center">
                                        <h1>{char.character.name}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )
                )
            )}
        </div>
    );
};

export default CharacterList;
