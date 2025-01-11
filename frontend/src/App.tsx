import { Route, Routes } from "react-router"
import { EditorPage } from "./pages/EditorPage"
import { LoginPage } from "./pages/loginPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/create" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<EditorPage />} />
      </Routes>
    </>
  )
}

export default App
