import Main from "./components/Main"
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col w-full bg-linear-to-br from-sky-900 via-indigo-900 to-slate-950 text-slate-100">
            <Main />
          </div>
        }
      />
    </Routes>
  )
}

export default App
