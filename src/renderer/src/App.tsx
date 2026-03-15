import { useEffect, useState, useRef } from 'react'
import { MdHome } from "react-icons/md";
import { IoMusicalNotesSharp, IoSettingsSharp, IoPower } from "react-icons/io5";
import { BsFillGridFill } from "react-icons/bs";
import { HashRouter as Router, Routes, Route } from "react-router-dom"

type ControllerCommand = "RIGHT" | "DOWN" | "LEFT" | "UP" | "A" | "B" | "R1" | "L1"
type Pages = "home" | "library" | "music" | "settings" | "power"

function App(): React.JSX.Element {
  const [ page, setPage ] = useState<Pages>('home');
  const pageRef = useRef<string>("home");
  
  const activeColor = "#BDEBA7";

  useEffect(() => {
    pageRef.current = page;
  }, [page])
    
  window.electronAPI.onControllerInput((cmd: ControllerCommand) => {
    switch (cmd) {
      case "R1":
        switch (page) {
          case "home":
            setPage("library");
            break;
          case "library":
            setPage("music");
            break;
          case "music":
            setPage("settings");
            break;
          case "settings":
            setPage("power");
            break;
          case "power":
            setPage("home");
            break;
        }
        break;
      case "L1":
        switch (page) {
          case "home":
            setPage("power");
            break;
          case "library":
            setPage("home");
            break;
          case "music":
            setPage("library");
            break;
          case "settings":
            setPage("music");
            break;
          case "power":
            setPage("settings");
            break;
        }
    }
  })
  
  return (
    <>
    <Router>
      <div className="navigation-bar-container"> 
        <div className="navigation-bar">
          <div className="nav-icon-container">
            <MdHome className="nav-icon" style={{color: page === "home" ? activeColor : "white"}}/>
            <BsFillGridFill className="nav-icon" style={{color: page === "library" ? activeColor : "white"}}/>
            <IoMusicalNotesSharp className="nav-icon" style={{color: page === "music" ? activeColor : "white"}}/>
            <IoSettingsSharp className="nav-icon" style={{color: page === "settings" ? activeColor : "white"}}/>
            <IoPower className="nav-icon" style={{color: page === "power" ? activeColor: "white"}}/>
          </div>
        </div>
      </div>
      <main>
        <Routes>
          <Route path="/"/>
        </Routes>
      </main>
    </Router>
    </>
  )
}

export default App
