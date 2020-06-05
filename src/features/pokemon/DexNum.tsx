import React from "react";
import { useSelector } from "react-redux";
import { selectDexNum } from "./pokemonDetailsSlice";

export const DexNum = () => {
    const dexNum = useSelector(selectDexNum);
    return (
        <ul className="mt-5 h-104 overflow-y-auto">
            {dexNum.map(
                (ele: { entry_number: number; pokedex: { name: string } }) => (
                    <li
                        className="text-white ml-2  grid grid-cols-3 "
                        key={ele.pokedex.name}
                    >
                        <div className="col-span-2">{ele.pokedex.name}:</div>
                        <div className="col-span-1">{ele.entry_number}</div>
                    </li>
                )
            )}
        </ul>
    );
};
