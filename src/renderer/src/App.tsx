import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { useEffect, useState } from 'react'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [ files, setFiles ] = useState<string[]>()

  useEffect(() => {
    const getFiles = async () => {
      const f = await window.electronAPI.readConfigDirectory()
      setFiles(f);
      return 
    }
    
    getFiles();
  }, [])

  return (
    <>
      {files?.map((file) => {
        return <p>{file}</p>
      })}
    </>
  )
}

export default App
