import { useEffect, useState } from 'react'

function App(): React.JSX.Element {

  useEffect(() => {
    const getFiles = async () => {
      const f = await window.electronAPI.readConfigDirectory()
      console.log(f);
    }
    
    getFiles();
  }, [])

  return (
    <>
    </>
  )
}

export default App
