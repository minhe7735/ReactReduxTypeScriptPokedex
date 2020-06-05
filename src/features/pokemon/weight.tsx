import React from "react";
import { useSelector } from "react-redux";
import { selectWeight } from "./pokemonDetailsSlice";

export const Weight = () => {
    const weight = useSelector(selectWeight);
    return <div className="text-center text-white mt-5">{weight / 10}kg</div>;
};
