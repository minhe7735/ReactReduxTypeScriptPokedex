import React from "react";
import { useSelector } from "react-redux";
import { selectHeight } from "./pokemonDetailsSlice";

export const Height = () => {
    const height = useSelector(selectHeight);
    return <div className=" text-center text-white mt-5">{height / 10}m</div>;
};
