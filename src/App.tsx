import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/home/Home";
import Nav from "./page/nav/Nav";
import Cadastro from "./page/cadastro/Cadastro";
import NotFound from "./Notfound";
import Page from "./page/home/Page";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cadastro" element={<Cadastro />}></Route>
          <Route path="/page" element={<Page />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
