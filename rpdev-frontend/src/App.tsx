import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hub from "./pages/Hub";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="hub" Component={Hub} />
      </Routes>
    </BrowserRouter>
  );
}
