import React from "react";
import { useSelector } from "react-redux";
import { selectShape } from "./pokemonDetailsSlice";

export const Shape = () => {
    const shape = useSelector(selectShape);
    return <div className=" text-center text-white mt-5">{shape.name}</div>;
};
