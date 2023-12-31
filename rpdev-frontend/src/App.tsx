import './App.css'
import CustomCursor from './components/CustomCursor'
import SiteView from './components/SiteView'

function App() {
  return (
    <>
      <CustomCursor moveDuration={0.2} shrinkDuration={0.1} />
      <SiteView targetObjectCount={10} />
    </>
  )
}

export default App
