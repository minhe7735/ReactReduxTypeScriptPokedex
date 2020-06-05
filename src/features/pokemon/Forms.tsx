import React from "react";
import { useSelector } from "react-redux";
import { selectForms } from "./pokemonDetailsSlice";

export const Form = () => {
    const forms = useSelector(selectForms);
    return (
        <div className="flex h-full justify-center bg-gray-700">
            <div className=" h-full row-span-1 flex justify-between items-center overflow-x-auto">
                {forms.map((ele: string) =>
                    ele === "172-spiky-eared" ? (
                        <img
                            className="object-contain h-full w-auto"
                            key={ele}
                            src="https://img.pokemondb.net/sprites/heartgold-soulsilver/normal/pichu-spiky-eared.png"
                            alt={`${ele} sprite`}
                        />
                    ) : (
                        <img
                            className="object-contain h-full w-auto"
                            key={ele}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ele}.png`}
                            alt={`${ele} sprite`}
                        />
                    )
                )}
            </div>
        </div>
    );
};
