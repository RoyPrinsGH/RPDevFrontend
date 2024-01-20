import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hub from "./pages/Hub";
import AboutMe from "./pages/AboutMe";
import Echoes from "./pages/Echoes";
import MastermindComparer from "./pages/MastermindComparer";
import TodoItems from "./pages/TodoItems";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="hub" Component={Hub} />
        <Route path="about" Component={AboutMe} />
        <Route path="echoes" Component={Echoes} />
        <Route path="mastermind" Component={MastermindComparer} />
        <Route path="todo" Component={TodoItems} />
      </Routes>
    </BrowserRouter>
  );
}
