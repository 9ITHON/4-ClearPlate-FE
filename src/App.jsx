import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));
const Login = React.lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
