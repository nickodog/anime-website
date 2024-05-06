'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CharacterList = ({ animeId, limit = 0 }: { animeId: number, limit: number }) => {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(`/anime/${animeId}/characters/all`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
                const data = await response.json();
                setCharacters(data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching character data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [animeId]);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                limit && !isNaN(limit) && characters.length > limit && characters.length > 0 ? (
                    <div className="w-auto flex flex-wrap items-center">
                        {characters.slice(0, limit).map((char: { character: { mal_id: number; name: string; images: { jpg: { image_url: string; }; }; } }) => (
                            <Link href={`/anime/${animeId}/characters/${char.character.mal_id}`} key={char.character.mal_id} className="mr-6">
                                <div>
                                    <div className="items-center">
                                        <div>
                                            <img className="rounded border-black border w-[100px] md:w-[150px] mx-auto" alt="charImage" src={char.character.images.jpg.image_url} />
                                        </div>
                                        <div className="text-center">
                                            <h1>{char.character.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <button className="rounded-full h-fit text-6xl transition duration-150 ease-in-out active:translate-y-1 active:shadow-md shadow-black" title="Show More" onClick={handleButtonClick}><FaRegArrowAltCircleRight/></button>
                    </div>
                ) : (
                    characters.length === 0 ? (
                        <p>No characters.</p>
                    ) : (
                        limit !== 0 ? (
                            <div className="w-auto flex flex-wrap">
                                {characters.map((char: { character: { mal_id: number; name: string; images: { jpg: { image_url: string; }; }; } }) => (
                                    <Link href={`/anime/${animeId}/characters/${char.character.mal_id}`} key={char.character.mal_id} className="mx-6">
                                        <div className="mx-6 mb-4 inline-block max-w-max">
                                            <div className="max-w-[100px] md:max-w-[150px]">
                                                <img className="rounded border-black border w-full h-auto" alt="charImage" src={char.character.images.jpg.image_url} />
                                            </div>
                                            <div className="max-w-[100px] md:max-w-[150px] text-center">
                                                <h1>{char.character.name}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="w-auto flex flex-wrap justify-center">
                                {characters.map((char: { character: { mal_id: number; name: string; images: { jpg: { image_url: string; }; }; } }) => (
                                    <Link href={`/anime/${animeId}/characters/${char.character.mal_id}`} key={char.character.mal_id} className="mx-6">
                                        <div className="mx-6 mb-4 inline-block max-w-max">
                                            <div className="max-w-[100px] md:max-w-[150px]">
                                                <img className="rounded border-black border w-full h-auto" alt="charImage" src={char.character.images.jpg.image_url} />
                                            </div>
                                            <div className="max-w-[100px] md:max-w-[150px] text-center">
                                                <h1>{char.character.name}</h1>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
                        
                    )
                )
            )}
        </>
    );
};

export default CharacterList;
