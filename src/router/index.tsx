import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { router } from "./router";
import HeadNavbar from "../components/HeadNavbar";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {router.map((el) => {
          return (
            <>
              <Route path={el.route} element={el.Element}></Route>
            </>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
