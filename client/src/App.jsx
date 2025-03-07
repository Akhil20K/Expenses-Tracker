import { BrowserRouter, Route, Routes } from "react-router-dom"
import HeroSection from "./components/home/HomePage"
import PublicNavbar from "./components/navBar/PublicNavbar";
import LoginForm from "./components/users/Login";
import RegistrationForm from "./components/users/Register";
import PrivateNavbar from "./components/navBar/PrivateNavbar";
import { getUserFromStorage } from "./utils/getUserFromStorage.js";
import { useSelector } from "react-redux";
import AddCategory from "./components/category/AddCategory.jsx";
import CategoriesList from "./components/category/CategoriesList.jsx";
import UpdateCategory from "./components/category/UpdateCategory.jsx";
import TransactionForm from "./components/transactions/TransactionForm.jsx";
import Dashboard from "./components/users/Dashboard.jsx";
import UserProfile from "./components/users/UserProfile.jsx";
import AuthRoute from "./components/Auth/AuthRoute.jsx";
import UpdateTransaction from "./components/transactions/UpdateTransaction.jsx";

function App() {
  // Relying on LocalStorage - but application is not updated accordingly until refresh
  // const user = getUserFromStorage();
  // let token;
  // if(user){
  //   token = user.token;
  // }
  // Get the User State 
  const user = useSelector((state) => state?.auth?.user);
  return (
    <BrowserRouter>
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={ <HeroSection/> }/>
        <Route path="/login" element={ <LoginForm/> }/>
        <Route path="/register" element={ <RegistrationForm/> }/>
        <Route path="/add-category" element={ <AuthRoute><AddCategory /></AuthRoute> }/>
        <Route path="/categories" element={ <AuthRoute><CategoriesList /></AuthRoute> }/>
        <Route path="/update-category/:id" element= { <AuthRoute><UpdateCategory /></AuthRoute> }/>
        <Route path="/add-transaction" element= { <AuthRoute><TransactionForm /></AuthRoute> }/>
        <Route path="/update-transaction/:id" element= { <AuthRoute><UpdateTransaction /></AuthRoute>} />
        <Route path="/dashboard" element= { <AuthRoute><Dashboard /></AuthRoute> }/>
        <Route path="/profile" element= { <AuthRoute><UserProfile /></AuthRoute> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
