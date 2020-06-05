import React from "react";
import { useSelector } from "react-redux";
import { selectMoves } from "./pokemonDetailsSlice";

export const Moves = () => {
    const moves = useSelector(selectMoves);
    return (
        <ul className="mt-5 h-104 overflow-y-auto">
            {moves.map((ele: { move: { name: string } }) => (
                <li
                    className="text-white ml-2 grid grid-cols-3 "
                    key={ele.move.name}
                >
                    <div className="col-span-2">{ele.move.name}</div>
                </li>
            ))}
        </ul>
    );
};
