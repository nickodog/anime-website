import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

const getData = async () =>  {
    const data = await fetch(`https://api.jikan.moe/v4/top/anime?filter=airing`)
    return data.json()
}
  
export default async function TopAnime() {
    const data = await getData();
    return (
        <div className="columns my-10">
            {data.data.map((anime: { mal_id: Key | null | undefined; images: { jpg: { large_image_url: string; }; }; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; episodes: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; score: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; rank: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`} className="w-full h-40 border-2 mx-7 rounded border-black flex">
                    <div className="w-max">
                        <img className="rounded border-0 h-full max-w-48" src={anime.images.jpg.large_image_url} alt="penis"></img>
                    </div>
                    <div className="w-fit ml-2 mt-1 mr-2">
                        <p>{anime.title}</p>
                        <p>{anime.episodes} episodes</p>
                        <p>{anime.status}</p>
                        <p>{anime.score}/10</p>
                        <p>{anime.rank}th most Popular</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

