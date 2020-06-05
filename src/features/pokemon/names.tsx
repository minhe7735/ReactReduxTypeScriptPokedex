import React from "react";
import { useSelector } from "react-redux";
import { selectNames } from "./pokemonDetailsSlice";

export const Names = () => {
    const language: { [key: string]: string } = {
        "ja-Hrkt": "Japanese(HrKt)",
        roomaji: "Official Roomaji",
        ko: "Korean",
        "zh-Hant": "Chinese(Traditional)",
        fr: "French",
        de: "German",
        es: "Spanish",
        it: "Italian",
        en: "English",
        ja: "Japanese",
        "zh-Hans": "Chinese(Simplified)",
    };
    const names = useSelector(selectNames);
    return (
        <ul className="mt-5">
            {names.map((ele: { name: string; language: { name: string } }) => (
                <li
                    className="text-white ml-2 grid grid-cols-3"
                    key={ele.language.name + ele.name}
                >
                    <div className="col-span-2">
                        {language[ele.language.name]}:
                    </div>
                    <div className="col-span-1">{ele.name}</div>
                </li>
            ))}
        </ul>
    );
};
