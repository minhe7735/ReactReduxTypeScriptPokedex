import React from "react";
import { useSelector } from "react-redux";
import { selectStats } from "./pokemonDetailsSlice";

export const Stats = () => {
    const stats = useSelector(selectStats);
    return (
        <ul className="mt-5">
            <div className="grid grid-cols-4">
                <div className="col-span-2"></div>
                <div className="col-span-1 text-white">IV</div>
                <div className="col-span-1 text-white">EV</div>
            </div>
            {stats.map(
                (ele: {
                    base_stat: number;
                    effort: number;
                    stat: { name: string };
                }) => (
                    <li
                        className="text-white ml-2 grid grid-cols-4 "
                        key={ele.stat.name + ele.base_stat}
                    >
                        <div className="col-span-2">{ele.stat.name}:</div>
                        <div className="col-span-1">{ele.base_stat}</div>
                        <div className="col-span-1">{ele.effort}</div>
                    </li>
                )
            )}
        </ul>
    );
};
