import React from "react";
import { useSelector } from "react-redux";
import { selectEvolution } from "./pokemonDetailsSlice";

export const Evolution = () => {
    const evolution = useSelector(selectEvolution);
    return (
        <div className="h-full bg-gray-700 row-span-1 flex justify-center items-center overflow-y-auto">
            {evolution.map((ele: string) => (
                <img
                    className="object-contain h-full w-auto "
                    key={ele}
                    src={`https://img.pokemondb.net/sprites/bank/normal/${ele}.png`}
                    alt={`${ele} sprite`}
                />
            ))}
        </div>
    );
};
