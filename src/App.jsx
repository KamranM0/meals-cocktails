import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import MealPage from "./pages/MealPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="meals" />}></Route>
          <Route path="cocktails" element={<Home />}></Route>
          <Route path="meals" element={<Home />}></Route>
          <Route path=":type/:id" element={<MealPage />}></Route>
          <Route path="favorites" element={<FavoritesPage />}></Route>
          <Route path="*" element={<div>Not found</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
