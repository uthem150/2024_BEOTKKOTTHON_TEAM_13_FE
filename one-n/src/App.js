import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MoreProductPage from './pages/MoreProductPage/MoreProductPage';
import CheckLocationPage from './pages/CheckLocationPage/CheckLocationPage';
import { NavBar } from "./components/NavBar/NavBar";
import Map from "./pages/Map/Map";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ReProductDetail from "./pages/ReProductDetail/ReProductDetail";
import SelectLocation from "./components/SelectLocation/SelectLocation";
import ProductPost from "./pages/ProductPost/ProductPost";
import SearchAddress from "./components/SearchAddress/SearchAddress";
import Scrap from "./pages/Scrap/Scrap";
import { MyContextProvider } from "./components/MyContextProvider/MyContextProvider";
import ChatList from "./pages/ChatList/ChatList";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import MainPage from "./pages/MainPage/MainPage";
import Explore from "./pages/Explore/Explore";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import RecipeReg from "./pages/RecipeReg/RecipeReg";
import SearchPage from "./pages/SearchPage/SearchPage";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <Router>
      <MyContextProvider>
        <div className="App">
          <Routes>
            <Route path="/product-detail/:productId" element={<ProductDetail />} />
            <Route path="/reproduct-detail/:productId" element={<ReProductDetail />} />
            <Route path="/map" element={<Map />} />
            <Route path="/search-address" element={<SearchAddress />} />
            <Route path="/select-location" element={<SelectLocation />} />
            <Route path="/product-post" element={<ProductPost />} />
            <Route path="/scrap" element={<Scrap />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/more-product' element={<MoreProductPage />} />
            <Route path='/check-location' element={<CheckLocationPage />} />
            <Route path="/chatroom/:chatId" element={<ChatRoom />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
            <Route path="/recipeRegister" element={<RecipeReg />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>
      </MyContextProvider>
      <ConditionalNavBar />
    </Router>
  );
}

function ConditionalNavBar() {
  const location = useLocation();
  const noNavBarRoutes = ["/signin"]; // Navbar를 표시하지 않을 경로

  return !noNavBarRoutes.includes(location.pathname) ? <NavBar /> : null;
}

export default App;