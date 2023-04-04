import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { GlobalStyle } from "./globalStyle";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
function App() {
  const { userTheme: theme, user } = useSelector((state) => state.User);
  return (
    <>
      <GlobalStyle />
      <div
        className="app"
        style={
          theme === "true"
            ? {
                bacgroundColor: "#f3f3f3",
                height: "100vh",
                transition: "all 0.5s",
              }
            : {
                backgroundColor: "#121212",
                height: "100vh",
                transition: "all 0.5s",
              }
        }
      >
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
