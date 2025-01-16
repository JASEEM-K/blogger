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
import { HomePage } from "./pages/HomePage"
import { useUserStore } from "./sotres/user.store"

function App() {

  const { authUser } = useUserStore()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >

      <Navbar />

      <Routes>
        <Route path="/create" element={<EditorPage />} />
        <Route path="/login" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route path="/register" element={authUser ? <HomePage /> : <RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/home" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route path="/blog/:blogId" element={<FullBlogPage />} />
        <Route path="/forgot/reset/:code" element={<ResetPasswordPage />} />
        <Route path="/email/verify/:code" element={<VerifyEmailPage />} />

      </Routes>

      <Toaster />
    </ThemeProvider>
  )
}

export default App
