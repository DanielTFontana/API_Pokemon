import React, { useEffect, useState } from "react";
import API from "../../../service/service";
import "./styles.css";
import closedPokeball from "../../../assets/pokeball-no-bg.png";
import openPokeball from "../../../assets/open-pokeball.png";

export const ListPoke: React.FC = ({}) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const getPokeList = async () => {
    try {
      const { data }: any = await API.get("?limit=150");
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

  return (
    <div className="listPokes">
      {pokemonList.map((pokemon: any) => (
        <div className="listName" key={pokemon.name}>
          <p className="list">
            {FirstLatterUpper(pokemon.name)}
          </p>
          <img className="pokeballList" src={closedPokeball} alt="" />
        </div>
      ))}
    </div>
  );
};
