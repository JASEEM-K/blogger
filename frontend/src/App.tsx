import { Route, Routes } from "react-router"
import { EditorPage } from "./pages/EditorPage"
import { LoginPage } from "./pages/loginPage"
import { RegisterPage } from "./pages/registerPage"
import { Navbar } from "./components/Navbar"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "react-hot-toast"
import { VerifyEmailPage } from "./pages/verifyEmalPage"
import { ForgotPasswordPage } from "./pages/forgotPasswordPage"
import { ResetPasswordPage } from "./pages/resetPasswordPage"
import { FullBlogPage } from "./pages/FullBlogPage"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >

      <Navbar />

      <Routes>
        <Route path="/create" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/blog/:blogId" element={<FullBlogPage />} />
        <Route path="/forgot/reset/:code" element={<ResetPasswordPage />} />
        <Route path="/email/verify/:code" element={<VerifyEmailPage />} />

      </Routes>

      <Toaster />
    </ThemeProvider>
  )
}

export default App
