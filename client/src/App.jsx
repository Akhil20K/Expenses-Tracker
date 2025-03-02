import { BrowserRouter, Route, Routes } from "react-router-dom"
import HeroSection from "./components/home/HomePage"
import PublicNavbar from "./components/navBar/PublicNavbar";
import LoginForm from "./components/users/Login";
import RegistrationForm from "./components/users/Register";

function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={ <HeroSection/> }/>
        <Route path="/login" element={ <LoginForm/> }/>
        <Route path="/register" element={ <RegistrationForm/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
