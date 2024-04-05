import { useState } from "react";
import "./App.css";
import { ClosedDex } from "./Components/PokedexClosed";
import { OpenDex } from "./Components/OpenPokeDex";
import Title from "./assets/Pokédex_logo.png";

function App() {
  const [openDex, setOpenDex] = useState<boolean>(false);

  const handleOpenDex = () => {
    setOpenDex(true);
  };

  return (
    <>
      {!openDex ? (
        <div className="initialContent">
          <img className="titleDex" src={Title} />

          <button className="buttonStyle" onClick={handleOpenDex}>
            <ClosedDex openDex={openDex} />
          </button>
        </div>
      ) : (
        <div className="contentAling">
          <OpenDex close={openDex} />
        </div>
      )}
    </>
  );
}

export default App;
