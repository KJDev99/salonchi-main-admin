import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routers/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS-ni import qilish

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
