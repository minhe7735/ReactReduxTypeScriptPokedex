import React, { useState } from "react";
import { WiStars } from "react-icons/wi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

export const Card = (info: { name: string; dex: number }) => {
    const [shinyState, setShinyState] = useState<boolean>(false);
    return (
        <div className="h-64 bg-gray-800 flex justify-center flex-col items-center rounded-lg shadow-outline">
            {" "}
            <div className="flex justify-between w-full">
                {/* dex number */}
                <div className="text-center w-3/12 text-white">
                    {info.dex.toString().padStart(3, "0")}
                </div>
                {/* pokemon name */}
                <div className="text-center w-1/2 text-white">
                    {info.name.toUpperCase()}
                </div>
                {/* toggle shiny */}
                <div className="w-3/12 flex justify-center">
                    <IconContext.Provider value={{ size: "30" }}>
                        <button
                            className="text-white"
                            onClick={(e) => {
                                e.preventDefault();
                                setShinyState(!shinyState);
                            }}
                        >
                            {shinyState ? (
                                <WiStars className="text-yellow-600" />
                            ) : (
                                <WiStars className="text-white" />
                            )}
                        </button>
                    </IconContext.Provider>
                </div>
            </div>
            {/* sprite */}
            <Link
                to={`/pokemon/${info.dex}/`}
                className="h-full w-full flex items-center justify-center"
            >
                {shinyState ? (
                    <img
                        className="object-contain h-full transform hover:scale-110 w-auto cursor-pointer"
                        src={`https://img.pokemondb.net/sprites/bank/shiny/${info.name}.png`}
                        alt={`${info.name} sprite`}
                    />
                ) : (
                    <img
                        className="object-contain h-full transform hover:scale-110 w-auto cursor-pointer"
                        src={`https://img.pokemondb.net/sprites/bank/normal/${info.name}.png`}
                        alt={`${info.name} sprite`}
                    />
                )}
            </Link>
        </div>
    );
};
