import React from "react";
import { useSelector } from "react-redux";
import { selectStats } from "./pokemonDetailsSlice";

export const Stats = () => {
    const stats = useSelector(selectStats);
    return (
        <ul className="mt-5">
            {stats.map((ele: any) => (
                <li
                    className="text-white ml-2 grid grid-cols-2 "
                    key={ele.stat.name + ele.base_stat}
                >
                    <div className="col-span-1">{ele.stat.name}:</div>
                    <div className="col-span-1">{ele.base_stat}</div>
                </li>
            ))}
        </ul>
    );
};
