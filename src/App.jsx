import {
  BrowserRouter,
  Navigate,
  replace,
  Route,
  Routes,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import { useDebouncing } from "./hooks/useDebouncing";
import MealPage from "./pages/MealPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="meals" />}></Route>
          <Route path="cocktails" element={<Home />}></Route>
          <Route path="meals" element={<Home />}></Route>
          <Route path=":type/:id" element={<MealPage />}></Route>
          <Route path="favorites"></Route>
          <Route path="*" element={<div>Not found</div>}></Route>
          {/* <Route path="/search" element={<SearchResult />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
