import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import useAuthStore from "stores/AuthStore";
import Chat from "./components/Chat";
function App() {
  const authUser = useAuthStore((_) => _.user);

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to={"/login"} />}
      >
        <Route path="/:socketId" element={<Chat />} />
      </Route>
      <Route
        path="/login"
        element={authUser ? <Navigate to={"/"} /> : <Login />}
      />
      <Route path="*" element={<> 404 </>}></Route>
    </Routes>
  );
}

export default App;
