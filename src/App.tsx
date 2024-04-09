import { useState } from "react";
import "./App.css";
import { ClosedDex } from "./Components/PokedexClosed";
import { OpenDex } from "./Components/OpenPokeDex";
import Title from "./assets/Pokédex_logo.png";
import Tooltip from "@mui/material/Tooltip";
import { Fade } from "@mui/material";

function App() {
  const [openDex, setOpenDex] = useState<boolean>(false);

  const handleOpenDex = () => {
    setOpenDex(true);
  };

 const handleCloseDex = () => {
  setOpenDex(false)
 }

  return (
    <>
      {!openDex ? (
        <div className="initialContent">
          <img className="titleDex" src={Title} />

          <Tooltip
            TransitionComponent={Fade}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -40],
                    },
                  },
                ],
              },
            }}
            arrow
            placement="top"
            title="Click to open"
          >
            <button className="buttonStyle" onClick={handleOpenDex}>
              <ClosedDex openDex={openDex} />
            </button>
          </Tooltip>
        </div>
      ) : (
        <div className="contentAling">
          <OpenDex onCloseDex={handleCloseDex} close={openDex} />
        </div>
      )}
    </>
  );
}

export default App;
