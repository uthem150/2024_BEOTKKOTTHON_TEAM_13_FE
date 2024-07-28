import MoreProductPage from "./pages/MoreProductPage/MoreProductPage";
import CheckLocationPage from "./pages/CheckLocationPage/CheckLocationPage";
import React from "react";
import { NavBar } from "./components/NavBar/NavBar";
import Map from "./pages/Map/Map";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ReProductDetail from "./pages/ReProductDetail/ReProductDetail";
import SelectLocation from "./components/SelectLocation/SelectLocation";
import ProductPost from "./pages/ProductPost/ProductPost";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
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
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <MyContextProvider>
        <div className="App">
          <Routes>
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
            <Route
              path="/reproduct-detail/:productId"
              element={<ReProductDetail />}
            />
            <Route path="/map" element={<Map />} />
            <Route path="/search-address" element={<SearchAddress />} />
            <Route path="/select-location" element={<SelectLocation />} />
            <Route path="/product-post" element={<ProductPost />} />
            <Route path="/scrap" element={<Scrap />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/more-product" element={<MoreProductPage />} />
            <Route path="/check-location" element={<CheckLocationPage />} />
            <Route path="/chatroom/:chatId" element={<ChatRoom />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
            <Route path="/recipeRegister" element={<RecipeReg />} />
          </Routes>
        </div>
      </MyContextProvider>
      <NavBar />
    </BrowserRouter>
  );
}

export default App;
