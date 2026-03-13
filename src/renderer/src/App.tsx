import { useEffect, useState, useRef } from 'react'

type ControllerCommand = "RIGHT" | "DOWN" | "LEFT" | "UP" | "A" | "B"

function App(): React.JSX.Element {
    const [ roms, setRoms ] = useState<string[]>([]);
    const romsRef = useRef<string[]>([]);
    const [ hovered, setHovered ] = useState<number>(0);
    const hoveredRef = useRef<number>(0);

    function loadGbaRom(path: string) {
        window.electronAPI.loadGbaRom(path);
    }

    useEffect(() => {
        hoveredRef.current = hovered;
    }, [hovered])

    useEffect(() => {
        romsRef.current = roms;
    }, [roms])
            
    useEffect(() => {
        const getFiles = async () => {
          const f = await window.electronAPI.readConfigDirectory()
          console.log(f);
        }
        
        window.electronAPI.onGbaRoms((value) => {
            setRoms(value);
        })
        
        window.electronAPI.onControllerInput((command: ControllerCommand) => {
            console.log(hovered + ' : ' + hoveredRef.current);
            switch (command) {
                case "DOWN":
                    if (hoveredRef.current < romsRef.current.length - 1) {
                        setHovered((h) => h + 1);
                    } else {
                        setHovered(0);
                    }
                    break;
                case "UP":
                    if (hoveredRef.current > 0) {
                        setHovered((h) => h - 1);    
                    } else {
                        setHovered(romsRef.current.length - 1);
                    }
                    break;
                case "A":
                    loadGbaRom(romsRef.current[hoveredRef.current]);
                    break;
            }
        })
            
        getFiles();
    }, [])

  return (
    <>
        {roms.map((value, index) => {
            return <a key={index} style={{color: hovered == index ? "lightblue" : "white"}}>{value}</a>
        })}
    </>
  )
}

export default App
