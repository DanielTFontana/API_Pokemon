import React, { useEffect, useState } from "react";
import API from "../../../service/service";
import "./styles.css";
import closedPokeball from "../../../assets/pokeball-no-bg.png";
import openPokeball from "../../../assets/open-pokeball.png";

interface ListPokeProps {
  onPokemonSelect: (pokemonName: string) => void;
}

export const ListPoke: React.FC<ListPokeProps> = ({onPokemonSelect }) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string>('')

  const getPokeList = async () => {
    try {
      const { data }: any = await API.get("?limit=151");
      setPokemonList(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const FirstLatterUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    getPokeList();
  }, []);

  console.log(pokemonList);

  const IChooseYou = (pokeName:string) => {
    onPokemonSelect(pokeName)
    setSelectedPokemon(pokeName)
  }


  return (
    <div className="listPokes">
      {pokemonList.map((pokemon: any) => (
        <div className="listName" key={pokemon.name} onClick={ () => IChooseYou(pokemon.name)}>
          <p className="list">
            {FirstLatterUpper(pokemon.name)}
          </p>
          <img className="pokeballList" src={selectedPokemon === pokemon.name? openPokeball : closedPokeball} alt="" />
        </div>
      ))}
    </div>
  );
};