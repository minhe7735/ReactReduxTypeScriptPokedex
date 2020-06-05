import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface nameLink {
    name: string;
    url: string;
}

interface PokemonState {
    evolution: string[];
    forms: string[];
    names: { name: string; language: nameLink }[];
    dexNum: { entry_number: number; pokedex: nameLink }[];
    types: { slot: number; type: nameLink }[];
    shape: { [key: string]: string };
    weight: number;
    height: number;
    num: number;
    moves: {
        move: nameLink;
        version_group_details: {
            level_learned_at: number;
            move_learn_method: nameLink;
            version_group: nameLink;
        };
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: nameLink;
    }[];
    abilities: {
        ability: nameLink;
        is_hidden: string;
        slot: number;
    }[];
    eggGroups: nameLink[];
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
        updateNames: (
            state,
            action: PayloadAction<
                {
                    name: string;
                    language: nameLink;
                }[]
            >
        ) => {
            state.names = action.payload;
        },
        updateDexNum: (
            state,
            action: PayloadAction<
                {
                    entry_number: number;
                    pokedex: nameLink;
                }[]
            >
        ) => {
            state.dexNum = action.payload;
        },
        updateTypes: (
            state,
            action: PayloadAction<{ slot: number; type: nameLink }[]>
        ) => {
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
        updateMoves: (
            state,
            action: PayloadAction<
                {
                    move: nameLink;
                    version_group_details: {
                        level_learned_at: number;
                        move_learn_method: nameLink;
                        version_group: nameLink;
                    };
                }[]
            >
        ) => {
            if (
                JSON.stringify(state.shape) !== JSON.stringify(action.payload)
            ) {
                state.moves = action.payload;
            }
        },
        updateStats: (
            state,
            action: PayloadAction<
                {
                    base_stat: number;
                    effort: number;
                    stat: nameLink;
                }[]
            >
        ) => {
            if (
                JSON.stringify(state.stats) !== JSON.stringify(action.payload)
            ) {
                state.stats = action.payload;
            }
        },
        updateAbilities: (
            state,
            action: PayloadAction<
                {
                    ability: nameLink;
                    is_hidden: string;
                    slot: number;
                }[]
            >
        ) => {
            if (
                JSON.stringify(state.abilities) !==
                JSON.stringify(action.payload)
            ) {
                state.abilities = action.payload;
            }
        },
        updateEggGroup: (state, action: PayloadAction<nameLink[]>) => {
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
    let pokemonRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${dexNum}/`
    );
    let pokemon = await pokemonRes.json();
    //get species/dexnum
    let speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${dexNum}/`
    );
    let species = await speciesRes.json();

    //get evolution data
    let evolutionRes = await fetch(species.evolution_chain.url);
    let evolution = await evolutionRes.json();

    //get dexNum of each pokemon in evolution chain
    let dexNumMatch = new RegExp(/\/\d+/);
    let evol_fam = [evolution.chain.species.name];
    if (evolution.chain.evolves_to.length > 0) {
        evolution.chain.evolves_to.forEach(
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
    if (pokemon.forms.length > 1) {
        // check if data is in pokeData.forms
        pokemon.forms.forEach((ele: { name: string }) => {
            let split = ele.name.split("-");
            if (split.length > 1) {
                split.splice(0, 1, pokemon.id);
                dif_forms.push(split.join("-"));
            } else {
                dif_forms.push(pokemon.id);
            }
        });
    } else if (
        // check if data is in pokeData.varieties and pokemon is not pikachu
        species.varieties.length > 1 &&
        species.varieties[0].pokemon.name !== "pikachu"
    ) {
        species.varieties.forEach((ele: { pokemon: { name: string } }) => {
            let split = ele.pokemon.name.split("-");
            if (split.length > 1) {
                split.splice(0, 1, species.id);
                dif_forms.push(split.join("-"));
            } else {
                dif_forms.push(species.id);
            }
        });
    } else if (
        // check if data is in pokeData.varieties and pokemon is pikachu
        species.varieties.length > 1 &&
        species.varieties[0].pokemon.name === "pikachu"
    ) {
        species.varieties.forEach((ele: { pokemon: nameLink }) => {
            let split = ele.pokemon.name.split("-");
            if (split.indexOf("cap") === -1) {
                dif_forms.push(ele.pokemon.url.match(dexNumMatch)![0]);
            } else {
                split.splice(0, 1, species.id);
                dif_forms.push(split.join("-"));
            }
        });
    }
    dispatch(updateEvolution(evol_fam));
    dispatch(updateAbilities(pokemon.abilities));
    dispatch(updateEggGroup(species.egg_groups));
    dispatch(updateStats(pokemon.stats));
    dispatch(updateMoves(pokemon.moves));
    dispatch(updateNum(species.id));
    dispatch(updateWeight(pokemon.weight));
    dispatch(updateHeight(pokemon.height));
    dispatch(updateShape(species.shape));
    dispatch(updateTypes(pokemon.types));
    dispatch(updateDexNum(species.pokedex_numbers));
    dispatch(updateNames(species.names));
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
