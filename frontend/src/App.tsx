import { Route, Routes } from "react-router"
import { EditorPage } from "./pages/EditorPage"
import { LoginPage } from "./pages/loginPage"
import { RegisterPage } from "./pages/registerPage"
import { Navbar } from "./components/Navbar"

function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path="/create" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

    </>
  )
}

export default App
