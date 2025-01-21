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
import { useEffect } from "react"
import { NotFoundPage } from "./pages/NotFoundPage"
import { ProfilePage } from "./pages/ProfilePage"
import { TagBlogPage } from "./pages/TagBlogPage"

function App() {

  const { authUser, authCheck } = useUserStore()

  useEffect(() => {
    authCheck()
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >

      <Navbar />

      <Routes>
        <Route path="/create" element={<EditorPage />} />
        <Route path="/login" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route path="/register" element={authUser ? <HomePage /> : <RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route path="/blog/:blogId" element={<FullBlogPage />} />
        <Route path="/forgot/reset/:code" element={<ResetPasswordPage />} />
        <Route path="/email/verify/:code" element={<VerifyEmailPage />} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/tag/:tag" element={<TagBlogPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>

      <Toaster />
    </ThemeProvider>
  )
}

export default App
