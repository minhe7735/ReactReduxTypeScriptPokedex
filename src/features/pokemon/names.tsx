import React from "react";
import { useSelector } from "react-redux";
import { selectNames } from "./pokemonDetailsSlice";

export const Names = () => {
    const names = useSelector(selectNames);
    return (
        <ul className="mt-5">
            {names.map((ele: any) => (
                <li
                    className="text-white ml-2 grid grid-cols-3"
                    key={ele.language.name + ele.name}
                >
                    <div className="col-span-1">{ele.language.name}:</div>
                    <div className="col-span-2">{ele.name}</div>
                </li>
            ))}
        </ul>
    );
};
