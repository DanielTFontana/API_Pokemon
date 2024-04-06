import React, { ChangeEvent, useEffect, useState } from "react";
import API from "../../../service/service";
import "./styles.css";
import closedPokeball from "../../../assets/pokeball-no-bg.png";
import openPokeball from "../../../assets/open-pokeball.png";
import { makeStyles } from "@material-ui/styles";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, MenuItem, Paper } from "@mui/material";

interface ListPokeProps {
  onPokemonSelect: (pokemonName: string) => void;
}

const useStyles = makeStyles({
  whiteSelect: {
    backgroundColor: "white",
    borderRadius: 3,
    minWidth: "150px",
    paddingLeft: 8,
  },
});

export const ListPoke: React.FC<ListPokeProps> = ({ onPokemonSelect }) => {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [firstSeasonList, setFirstSeasonList] = useState<any[]>([]);
  const [secondSeasonList, setSecondSeasonList] = useState<any[]>([]);
  const [thirdSeasonList, setThirdSeasonList] = useState<any[]>([]);
  const [fourthSeasonList, setFourthSeasonList] = useState<any[]>([]);
  const [fifthSeasonList, setFifthSeasonList] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonChange, setSeasonChange] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [filteresPokes, setFilteredPokes] = useState<any>([]);

  const seasonEnum = {
    0: pokemonList,
    1: firstSeasonList,
    2: secondSeasonList,
    3: thirdSeasonList,
    4: fourthSeasonList,
    5: fifthSeasonList,
  };

  const [selectedPokemon, setSelectedPokemon] = useState({
    name: "",
    id: 0,
  });

  const getPokeList = async () => {
    try {
      const { data }: any = await API.get("?limit=649");
      setPokemonList(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeasons = (array: []) => {
    setFirstSeasonList(array.slice(0, 151));
    setSecondSeasonList(array.slice(151, 251));
    setThirdSeasonList(array.slice(251, 386));
    setFourthSeasonList(array.slice(386, 494));
    setFifthSeasonList(array.slice(494, 649));
  };

  const handleSelectedSeason = (event: any) => {
    const newSelectedValue = event.target.value;
    if (!isNaN(newSelectedValue)) {
      setSelectedSeason(newSelectedValue);

      if (seasonEnum[newSelectedValue as keyof typeof seasonEnum]?.length > 0) {
        setSelectedPokemon(
          seasonEnum[newSelectedValue as keyof typeof seasonEnum][0]
        );
        onPokemonSelect(
          seasonEnum[newSelectedValue as keyof typeof seasonEnum][0].name
        );
      }
    }
    setSeasonChange(true);
  };

  const FirstLatterUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    getPokeList();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      handleSeasons(pokemonList as any);
    }
  }, [pokemonList]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchingText = event.target.value.toLowerCase();
    setSearchText(searchingText);
    const filteredPokes = seasonEnum[
      selectedSeason as keyof typeof seasonEnum
    ].filter((poke: any) => poke.name.toLowerCase().includes(searchingText));
    setFilteredPokes(filteredPokes);
  };

  const IChooseYou = (pokeName: string, pokemonId: number) => {
    onPokemonSelect(pokeName);
    setSelectedPokemon({ name: pokeName, id: pokemonId });
  };

  return (
    <div className="listPokes">
      <div className="listHeader">
        <Select
          size="small"
          value={seasonChange === false ? 6 : selectedSeason}
          className={classes.whiteSelect}
          onChange={handleSelectedSeason}
        >
          <MenuItem value={6} disabled>
            Season
          </MenuItem>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>First</MenuItem>
          <MenuItem value={2}>Second</MenuItem>
          <MenuItem value={3}>Third</MenuItem>
          <MenuItem value={4}>Fourth</MenuItem>
          <MenuItem value={5}>Fifth</MenuItem>
        </Select>
        <Paper>
          <InputBase
            onChange={handleSearch}
            style={{ paddingLeft: "0.5rem" }}
            placeholder="Search your pokemon"
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      <div className="insideContent">
        {(searchText
          ? filteresPokes
          : seasonEnum[selectedSeason as keyof typeof seasonEnum]
        ).map((pokemon: any) => (
          <div
            className="listName"
            key={pokemon.name}
            onClick={() =>
              IChooseYou(
                pokemon.name,
                parseInt(pokemon.url.split("/").slice(-2, -1)[0])
              )
            }
          >
            <p className="list">
              #{parseInt(pokemon.url.split("/").slice(-2, -1)[0])}{" "}
              {FirstLatterUpper(pokemon.name)}
            </p>
            <img
              className="pokeballList"
              src={
                selectedPokemon.name === pokemon.name
                  ? openPokeball
                  : closedPokeball
              }
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};
