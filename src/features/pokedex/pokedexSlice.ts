import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface objType {
    name: string;
    url: string;
}

interface PokedexState {
    pokemonList: objType[];
}

const initialState: PokedexState = {
    pokemonList: [],
};

export const pokedexSlice = createSlice({
    name: "pokedex",
    initialState,
    reducers: {
        updatePokedex: (state, action: PayloadAction<objType[]>) => {
            state.pokemonList = action.payload;
        },
    },
});

export const { updatePokedex } = pokedexSlice.actions;

export const getPokemonList = (): AppThunk => async (dispatch) => {
    let response = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species/?limit=807"
    );
    let data = await response.json();
    dispatch(updatePokedex(data.results));
};

export const selectPokedex = (state: RootState) => state.pokedex.pokemonList;

export default pokedexSlice.reducer;
