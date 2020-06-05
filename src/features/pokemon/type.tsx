import React from "react";
import { useSelector } from "react-redux";
import { selectTypes } from "./pokemonDetailsSlice";

export const Types = () => {
    const types = useSelector(selectTypes);
    return (
        <div className="grid grid-cols-2 mb-2">
            {types.map((ele: { type: { name: string } }) => (
                <div
                    key={ele.type.name}
                    className="col-span-1  flex justify-center items-center bg-gray-700"
                >
                    <div className={`bg-${ele.type.name} py-1 px-2 rounded-md`}>
                        {ele.type.name.toUpperCase()}
                    </div>
                </div>
            ))}
        </div>
    );
};
