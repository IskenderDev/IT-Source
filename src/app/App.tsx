import { Routes, Route } from "react-router-dom";
import { Home, Tariffs, Services } from "../pages";
import Header from "../components/layout/Header";
import Footer from '../components/layout/Footer';


export default function App() {
  return (
    <div className="bg-main min-h-screen font-mono">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tariffs" element={<Tariffs />} />
      </Routes>
      <Footer/>
    </div>
  );
}
