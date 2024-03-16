import React, { useState } from "react";
import { Card } from "./Card";
import { ListPoke } from "./List";

interface OpenDexProps {
    card?: React.ReactNode;
    list?: React.ReactNode;
  }

export const OpenDex: React.FC<OpenDexProps> = () => {
    const [chosenPoke, setChosenPoke] = useState<string>('');

    const handleChosenPoke = (pokeName: string) => {
        setChosenPoke(pokeName)
    }
    return(
        <div className="wrapper">
        <Card selectedPokemon={chosenPoke} />
        <ListPoke onPokemonSelect={handleChosenPoke} />
    </div>
    )
}