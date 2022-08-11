import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Detail from './pages/detail/Detail.jsx'

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path=":category/search/:keyword" element={<Catalog/>}/>
      <Route path=":category/:id" element={<Detail/>}/>
      <Route path=":category" element={<Catalog/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
