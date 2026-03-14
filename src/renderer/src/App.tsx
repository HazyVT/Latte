import { useEffect, useState, useRef } from 'react'
import { MdHome } from "react-icons/md";
import { IoLibrary, IoSettingsSharp, IoPower } from "react-icons/io5";

type ControllerCommand = "RIGHT" | "DOWN" | "LEFT" | "UP" | "A" | "B"

function App(): React.JSX.Element {
  const [ page, setPage ] = useState('home');
    
  return (
    <>
    <div className="navigation-bar-container"> 
      <div className="navigation-bar">
        <div className="nav-icon-container">
          <MdHome className="nav-icon" />
          <IoLibrary className="nav-icon" />
          <IoSettingsSharp className="nav-icon" />
          <IoPower className="nav-icon" />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
