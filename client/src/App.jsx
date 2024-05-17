import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
function App() {
  const authUser = true;
  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to={"/login"} />}
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<> 404 </>}></Route>
    </Routes>
  );
}

export default App;
