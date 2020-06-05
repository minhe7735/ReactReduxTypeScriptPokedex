import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonList, selectPokedex } from "./pokedexSlice";
import { Card } from "./Card";

export function Pokedex() {
    const dispatch = useDispatch();
    const pokedex = useSelector(selectPokedex);
    useEffect(() => {
        dispatch(getPokemonList());
    }, [dispatch]);
    return (
        <div>
            <React.Fragment>
                <div className="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4 bg-black p-1">
                    {pokedex.map((value, index) => {
                        return (
                            <Card
                                name={value.name}
                                dex={index + 1}
                                key={index + 1}
                            />
                        );
                    })}
                </div>
            </React.Fragment>
            <div className="text-center text-white bg-black">
                Pokémon images & names © 1995-2020 Nintendo/Game Freak.
            </div>
        </div>
    );
}
