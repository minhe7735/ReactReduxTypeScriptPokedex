import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNum } from "./pokemonDetailsSlice";
import { Types } from "./type";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";

import { IconContext } from "react-icons";

export const MainPanel = () => {
    const num = useSelector(selectNum);
    return (
        <div className="flex flex-col justify-between items-center col-span-2 sm:col-span-5 bg-gray-700 ">
            <div className="flex sm:flex-row lg:flex-col justify-center items-center h-full">
                {num > 1 ? (
                    <IconContext.Provider value={{ size: "50" }}>
                        <Link
                            to={`/pokemon/${num - 1}/`}
                            className=" flex items-center justify-center"
                        >
                            <TiChevronLeftOutline className="text-white" />
                        </Link>
                    </IconContext.Provider>
                ) : (
                    <IconContext.Provider value={{ size: "50" }}>
                        <TiChevronLeftOutline className="text-black" />
                    </IconContext.Provider>
                )}

                <img
                    className="object-contain h-auto lg:w-full xl:w-10/12 sm:w-1/2 "
                    src={`https://www.serebii.net/pokemon/art/${num
                        .toString()
                        .padStart(3, "0")}.png`}
                    alt={`${num} sprite`}
                />
                {num < 807 ? (
                    <IconContext.Provider value={{ size: "50" }}>
                        <Link
                            to={`/pokemon/${num + 1}/`}
                            className="flex items-center justify-center"
                        >
                            <TiChevronRightOutline className="text-white" />
                        </Link>
                    </IconContext.Provider>
                ) : (
                    <IconContext.Provider value={{ size: "50" }}>
                        <TiChevronRightOutline className="text-black" />
                    </IconContext.Provider>
                )}
            </div>
            <Types />
        </div>
    );
};
