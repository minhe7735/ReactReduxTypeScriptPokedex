import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAbilities } from "./pokemonDetailsSlice";

export const Abilities = () => {
    const abilities = useSelector(selectAbilities);
    return (
        <ul className="mt-5">
            {abilities.map((ele: any) =>
                !ele.is_hidden ? (
                    <li
                        className="text-white ml-2 grid grid-cols-2 "
                        key={ele.ability.name + ele.base_stat}
                    >
                        <div className="col-span-1">{ele.ability.name}</div>
                    </li>
                ) : (
                    <li
                        className="text-white ml-2 grid grid-cols-2 "
                        key={ele.ability.name + ele.base_stat}
                    >
                        <div className="col-span-1">{ele.ability.name}:</div>
                        <div className="col-span-1">Hidden</div>
                    </li>
                )
            )}
        </ul>
    );
};
