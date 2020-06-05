import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemonDetails } from "./pokemonDetailsSlice";
import { useParams } from "react-router-dom";
import { MainPanel } from "./MainPanel";
import { Evolution } from "./Evolution";
import { Form } from "./Forms";
import { Names } from "./names";
import { DexNum } from "./DexNum";
import { Shape } from "./Shape";
import { Weight } from "./weight";
import { Height } from "./height";
import { Moves } from "./Moves";
import { Stats } from "./stats";
import { EggGroup } from "./eggGroup";
import { Abilities } from "./abilities";

export function PokemonDetails() {
    const dispatch = useDispatch();
    let { number } = useParams();

    useEffect(() => {
        dispatch(getPokemonDetails(number));
    }, [dispatch, number]);

    return (
        <div className="h-auto min-h-screen w-full grid grid-rows-5 gap-1 bg-black">
            <div className=" grid grid-cols-5 sm:grid-rows-2 gap-1 row-span-3 ">
                <MainPanel />
                <div className="grid grid-rows-6 col-span-3 sm:col-span-5  ">
                    <div className=" row-span-5 overflow-y-auto ">
                        <div className="grid h-full grid-flow-col gap-1 sm:overflow-y-auto max-w-none">
                            <div className=" bg-gray-700 w-64">
                                <h1 className="text-center text-white bg-blue-500">
                                    Name
                                </h1>
                                <Names />
                            </div>
                            <div className=" bg-gray-700 w-64">
                                <h1 className="text-center text-white bg-blue-500">
                                    Pokedex Number
                                </h1>
                                <DexNum />
                            </div>
                            <div className=" bg-gray-700 w-64 overflow-y-auto  ">
                                <h1 className="text-center text-white bg-blue-500">
                                    Moves
                                </h1>
                                <Moves />
                            </div>
                            <div className=" bg-gray-700 w-64">
                                <h1 className="text-center text-white bg-blue-500">
                                    Base Stats
                                </h1>
                                <Stats />
                            </div>
                            <div className=" bg-gray-700 w-64">
                                <h1 className="text-center text-white bg-blue-500">
                                    abilities
                                </h1>
                                <Abilities />
                            </div>
                            <div className=" bg-gray-700 w-64">
                                <h1 className="text-center text-white bg-blue-500">
                                    egg group
                                </h1>
                                <EggGroup />
                            </div>
                        </div>
                    </div>
                    {/* shape weight height */}
                    <div className=" grid grid-cols-3 gap-1">
                        <div className=" bg-gray-700">
                            <h1 className="text-center text-white bg-blue-500">
                                Shape
                            </h1>
                            <Shape />
                        </div>
                        <div className=" bg-gray-700">
                            <h1 className="text-center text-white bg-blue-500">
                                Height
                            </h1>
                            <Height />
                        </div>
                        <div className=" bg-gray-700">
                            <h1 className="text-center text-white bg-blue-500">
                                Height
                            </h1>
                            <Weight />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-white bg-blue-500 text-center">
                    Evolution
                </h1>
                <Evolution />
            </div>
            <div>
                <h1 className="text-white bg-blue-500 text-center">Forms</h1>
                <Form />
            </div>
            <div className="text-center text-white bg-black">
                Pokémon images & names © 1995-2020 Nintendo/Game Freak.
            </div>
        </div>
    );
}
