import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScreenTest from "./pages/ScreenTest";
import Unsupported from "./pages/Unsupported";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screen-test" element={<ScreenTest />} />
        <Route path="/unsupported" element={<Unsupported/>} />
      </Routes>
    </BrowserRouter>
  );
}