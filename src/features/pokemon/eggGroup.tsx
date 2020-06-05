import React from "react";
import { useSelector } from "react-redux";
import { selectEggGroup } from "./pokemonDetailsSlice";

export const EggGroup = () => {
    const eggGroup = useSelector(selectEggGroup);
    return (
        <ul className="mt-5">
            {eggGroup.map((ele: { name: string }) => (
                <li className="text-white ml-2 " key={ele.name}>
                    <div className="col-span-1">{ele.name}</div>
                </li>
            ))}
        </ul>
    );
};
