import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/sign-up/Signup";
import Signin from "./pages/sign-in/Signin";
import Dashboard from "./pages/dashboard/Dashboard";
import SendMoney from "./pages/send-money/SendMoney";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/send/:username/:userId/" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
