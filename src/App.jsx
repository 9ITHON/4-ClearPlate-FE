import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
