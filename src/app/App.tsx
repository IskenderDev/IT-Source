import { Routes, Route } from "react-router-dom";
import { Home, OneC, Services } from "../pages";
import Header from "../components/layout/Header";
import Footer from '../components/layout/Footer';


export default function App() {
  return (
    <div className="bg-main min-h-screen font-mono">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/1c" element={<OneC />} />
      </Routes>
      <Footer/>
    </div>
  );
}
