import { useEffect, useState } from 'react'

function App(): React.JSX.Element {
    const [ roms, setRoms ] = useState<string[]>([]);

    function loadGbaRom(path: string) {
        window.electronAPI.loadGbaRom(path);
    }
            
    useEffect(() => {
        const getFiles = async () => {
          const f = await window.electronAPI.readConfigDirectory()
          console.log(f);
        }
        
        window.electronAPI.onGbaRoms((value) => {
            setRoms(value);
        })
        
        window.addEventListener('gamepadconnected', (e) => {
            console.log("Gamepad connected");
            console.log(e);
        })
            
        getFiles();
    }, [])

  return (
    <>
        {roms.map((value, _index) => {
            return <button onClick={() => loadGbaRom(value)}>{value}</button>
        })}
    </>
  )
}

export default App
