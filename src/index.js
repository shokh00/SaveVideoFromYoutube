import ReactDOM from "react-dom/client";
import MyApp from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <MyApp />
  </BrowserRouter>
)

