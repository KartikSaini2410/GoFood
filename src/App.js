import './App.css';
import Home from "../src/screens/Home";
import Login from "../src/screens/Login";
import SignUp from "../src/screens/Signup.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<SignUp />} />
          <Route exact path="/myorder" element={<MyOrder />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
