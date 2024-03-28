import { useState } from "react";
import "./App.css";
import { ClosedDex } from "./Components/PokedexClosed";
import { OpenDex } from "./Components/OpenPokeDex";

function App() {
  const [openDex, setOpenDex] = useState<boolean>(false);

  const handleOpenDex = () => {
    setOpenDex(true);
  };

  return (
    <div className="contentAling">
      {openDex === false ? (
        <button className="buttonStyle" onClick={handleOpenDex}>
          <ClosedDex openDex={openDex} />
        </button>
      ) : (
        <OpenDex />
      )}
    </div>
  );
}

export default App;
