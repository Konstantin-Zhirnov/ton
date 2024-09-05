import WebApp from '@twa-dev/sdk'

import { Header } from './components/Header'
import { Information } from './components/Information'
import { Buttons } from './components/Buttons'

function App() {
  const showAlert = () => {
    WebApp.showAlert('Hey there!')
  }
  return (
    <>
      <Header />
      <main>
        <b>{WebApp.platform}</b>
        <button onClick={showAlert}>Show alert</button>
        <Information />

        <Buttons />
      </main>
    </>
  )
}

export default App
