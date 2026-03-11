import { useEffect, useState } from 'react'

function App(): React.JSX.Element {
    const [ roms, setRoms ] = useState<string[]>([]);

    
    useEffect(() => {
        const getFiles = async () => {
          const f = await window.electronAPI.readConfigDirectory()
          console.log(f);
        }
        
        window.electronAPI.onGbaRoms((value) => {
            setRoms(value);
        })
            
        getFiles();
    }, [])

  return (
    <>
    {roms.map((value, _index) => {
        return <p>{value}</p>
    })}
    </>
  )
}

export default App
