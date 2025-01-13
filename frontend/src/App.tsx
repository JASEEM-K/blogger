import { Route, Routes } from "react-router"
import { EditorPage } from "./pages/EditorPage"
import { LoginPage } from "./pages/loginPage"
import { RegisterPage } from "./pages/registerPage"
import { Navbar } from "./components/Navbar"
import { ThemeProvider } from "./components/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >

      <Navbar />

      <Routes>
        <Route path="/create" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

    </ThemeProvider>
  )
}

export default App
