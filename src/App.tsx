import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { Home } from "./components/pages/Home";
import { Villas } from "./components/pages/Villas";
import { VillaDetail } from "./components/pages/VillaDetail";
import { About } from "./components/pages/About";
import { Contact } from "./components/pages/Contact";
import { NotFound } from "./components/site/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/villas" element={<Villas />} />
        <Route path="/villas/:id" element={<VillaDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
