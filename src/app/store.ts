import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pokedexReducer from "../features/pokedex/pokedexSlice";
import pokemonDetailsReducer from "../features/pokemon/pokemonDetailsSlice";

export const store = configureStore({
    reducer: {
        pokedex: pokedexReducer,
        pokemonDetails: pokemonDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
