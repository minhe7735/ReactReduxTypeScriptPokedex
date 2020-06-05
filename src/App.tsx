import React from "react";
import { Pokedex } from "./features/pokedex/Pokedex";
import { PokemonDetails } from "./features/pokemon/PokemonDetails";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Pokedex} />
                <Route
                    exact
                    path="/pokemon/:number"
                    render={({ match }) => {
                        const num = Number(match.params.number);
                        if (
                            num < 1 ||
                            num > 807 ||
                            isNaN(num) ||
                            !Number.isInteger(num)
                        ) {
                            return <Redirect to={"/"} />;
                        } else {
                            return <PokemonDetails />;
                        }
                    }}
                />
                <Route render={() => <Redirect to={"/"} />} />
            </Switch>
        </div>
    );
}

export default App;
