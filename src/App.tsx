import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminMenuPage from "./pages/AdminMenuPage";
import MenuListPage from "./pages/MenuListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuListPage />} />
        <Route path="/admin" element={<AdminMenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
