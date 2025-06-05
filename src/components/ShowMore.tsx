'use client'
import React, { useState } from 'react';

export const ShowMore = ({ text }: {text: string[]}) => {
    const [isShowing, setShowMore] = useState(false);

    const handleClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setShowMore(prev => !prev);
    };

    return (
        <div className="w-full md:w-fit">
            {isShowing ? (
                <>
                    {text.map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                    {text.length > 10 && (
                        <button className='px-2 py-1 mt-2 rounded border-[1px] float-right md:float-none' onClick={handleClick}>Show Less</button>
                    )}
                </>
            ) : (
                <>
                    {text.slice(0,10).map((paragraph: string, index: number) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                    {text.length > 10 && (
                        <div className="text-right mt-2 md:text-left md:mt-0">
                            <button className='px-2 py-1 rounded border-[1px]' onClick={handleClick}>Show More</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
