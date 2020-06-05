import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface PokeData {
    [key: string]: any;
}

interface PokemonState {
    evolution: string[];
    forms: string[];
    names: PokeData[];
    dexNum: PokeData[];
    types: PokeData[];
    shape: { [key: string]: string };
    weight: number;
    height: number;
    num: number;
    moves: PokeData[];
    stats: PokeData[];
    abilities: PokeData[];
    eggGroups: PokeData[];
}

const initialState: PokemonState = {
    evolution: [],
    forms: [],
    names: [],
    dexNum: [],
    types: [],
    shape: {},
    weight: 0,
    height: 0,
    num: 1,
    moves: [],
    stats: [],
    abilities: [],
    eggGroups: [],
};

export const pokemonSlice = createSlice({
    name: "pokemonDetails",
    initialState,
    reducers: {
        updateEvolution: (state, action: PayloadAction<string[]>) => {
            if (
                JSON.stringify(state.evolution) !==
                JSON.stringify(action.payload)
            ) {
                state.evolution = action.payload;
            }
        },
        updateForms: (state, action: PayloadAction<string[]>) => {
            if (
                JSON.stringify(state.forms) !== JSON.stringify(action.payload)
            ) {
                state.forms = action.payload;
            }
        },
        updateNames: (state, action: PayloadAction<PokeData[]>) => {
            state.names = action.payload;
        },
        updateDexNum: (state, action: PayloadAction<PokeData[]>) => {
            state.dexNum = action.payload;
        },
        updateTypes: (state, action: PayloadAction<PokeData[]>) => {
            if (
                JSON.stringify(state.types) !== JSON.stringify(action.payload)
            ) {
                state.types = action.payload;
            }
        },
        updateShape: (
            state,
            action: PayloadAction<{ [key: string]: string }>
        ) => {
            if (
                JSON.stringify(state.shape) !== JSON.stringify(action.payload)
            ) {
                state.shape = action.payload;
            }
        },
        updateWeight: (state, action: PayloadAction<number>) => {
            if (state.weight !== action.payload) {
                state.weight = action.payload;
            }
        },
        updateHeight: (state, action: PayloadAction<number>) => {
            if (state.height !== action.payload) {
                state.height = action.payload;
            }
        },
        updateNum: (state, action: PayloadAction<number>) => {
            if (state.num !== action.payload) {
                state.num = action.payload;
            }
        },
        updateMoves: (state, action: PayloadAction<PokeData[]>) => {
            if (
                JSON.stringify(state.shape) !== JSON.stringify(action.payload)
            ) {
                state.moves = action.payload;
            }
        },
        updateStats: (state, action: PayloadAction<PokeData[]>) => {
            if (
                JSON.stringify(state.stats) !== JSON.stringify(action.payload)
            ) {
                state.stats = action.payload;
            }
        },
        updateAbilities: (state, action: PayloadAction<PokeData[]>) => {
            if (
                JSON.stringify(state.abilities) !==
                JSON.stringify(action.payload)
            ) {
                state.abilities = action.payload;
            }
        },
        updateEggGroup: (state, action: PayloadAction<PokeData[]>) => {
            if (
                JSON.stringify(state.eggGroups) !==
                JSON.stringify(action.payload)
            ) {
                state.eggGroups = action.payload;
            }
        },
    },
});

export const {
    updateEvolution,
    updateForms,
    updateNames,
    updateDexNum,
    updateTypes,
    updateShape,
    updateHeight,
    updateWeight,
    updateNum,
    updateMoves,
    updateStats,
    updateAbilities,
    updateEggGroup,
} = pokemonSlice.actions;

export const getPokemonDetails = (dexNum: string): AppThunk => async (
    dispatch
) => {
    //get pokemon/dexnum
    let response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNum}/`);
    let data1 = await response1.json();
    //get species/dexnum
    let response2 = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${dexNum}/`
    );
    let data2 = await response2.json();
    let pokeData: PokeData = await { ...data1, ...data2 };

    //get evolution data
    let response3 = await fetch(pokeData.evolution_chain.url);
    let data3 = await response3.json();

    //get dexNum of each pokemon in evolution chain
    let dexNumMatch = new RegExp(/\/\d+/);
    let evol_fam = [data3.chain.species.name];
    if (data3.chain.evolves_to.length > 0) {
        data3.chain.evolves_to.forEach(
            (ele: { species: { name: string }; evolves_to: [] }) => {
                evol_fam = [...evol_fam, ele.species.name];
                if (ele.evolves_to.length > 0) {
                    ele.evolves_to.forEach(
                        (ele: {
                            species: { name: string };
                            evolves_to: [];
                        }) => {
                            evol_fam = [...evol_fam, ele.species.name];
                            if (ele.evolves_to.length > 0) {
                                ele.evolves_to.forEach(
                                    (ele: { species: { name: string } }) =>
                                        (evol_fam = [
                                            ...evol_fam,
                                            ele.species.name,
                                        ])
                                );
                            }
                        }
                    );
                }
            }
        );
    }

    //get url id for each form of the pokemon
    let dif_forms: string[] = [];
    if (pokeData.forms.length > 1) {
        // check if data is in pokeData.forms
        pokeData.forms.forEach((ele: { name: string }) => {
            let split = ele.name.split("-");
            if (split.length > 1) {
                split.splice(0, 1, pokeData.id);
                dif_forms.push(split.join("-"));
            } else {
                dif_forms.push(pokeData.id);
            }
        });
    } else if (
        // check if data is in pokeData.varieties and pokemon is not pikachu
        pokeData.varieties.length > 1 &&
        pokeData.varieties[0].pokemon.name !== "pikachu"
    ) {
        pokeData.varieties.forEach((ele: { pokemon: { name: string } }) => {
            let split = ele.pokemon.name.split("-");
            if (split.length > 1) {
                split.splice(0, 1, pokeData.id);
                dif_forms.push(split.join("-"));
            } else {
                dif_forms.push(pokeData.id);
            }
        });
    } else if (
        // check if data is in pokeData.varieties and pokemon is pikachu
        pokeData.varieties.length > 1 &&
        pokeData.varieties[0].pokemon.name === "pikachu"
    ) {
        pokeData.varieties.forEach(
            (ele: { pokemon: { url: string; name: string } }) => {
                let split = ele.pokemon.name.split("-");
                if (split.indexOf("cap") === -1) {
                    dif_forms.push(ele.pokemon.url.match(dexNumMatch)![0]);
                } else {
                    split.splice(0, 1, pokeData.id);
                    dif_forms.push(split.join("-"));
                }
            }
        );
    }
    dispatch(updateEvolution(evol_fam));
    dispatch(updateAbilities(data1.abilities));
    dispatch(updateEggGroup(data2.egg_groups));
    dispatch(updateStats(data1.stats));
    dispatch(updateMoves(data1.moves));
    dispatch(updateNum(data2.id));
    dispatch(updateWeight(data1.weight));
    dispatch(updateHeight(data1.height));
    dispatch(updateShape(data2.shape));
    dispatch(updateTypes(data1.types));
    dispatch(updateDexNum(data2.pokedex_numbers));
    dispatch(updateNames(data2.names));
    dispatch(updateForms(dif_forms));
};

export const selectEvolution = (state: RootState) =>
    state.pokemonDetails.evolution;
export const selectForms = (state: RootState) => state.pokemonDetails.forms;
export const selectNames = (state: RootState) => state.pokemonDetails.names;
export const selectDexNum = (state: RootState) => state.pokemonDetails.dexNum;
export const selectTypes = (state: RootState) => state.pokemonDetails.types;
export const selectShape = (state: RootState) => state.pokemonDetails.shape;
export const selectWeight = (state: RootState) => state.pokemonDetails.weight;
export const selectHeight = (state: RootState) => state.pokemonDetails.height;
export const selectNum = (state: RootState) => state.pokemonDetails.num;
export const selectMoves = (state: RootState) => state.pokemonDetails.moves;
export const selectStats = (state: RootState) => state.pokemonDetails.stats;
export const selectEggGroup = (state: RootState) =>
    state.pokemonDetails.eggGroups;
export const selectAbilities = (state: RootState) =>
    state.pokemonDetails.abilities;

export default pokemonSlice.reducer;
