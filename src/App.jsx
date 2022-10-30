import { AuthProvider } from "./context/AuthContext";
import { Router } from "./Router/Router";
import Global from "./styles/global";
import "./App.css";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <div id="App">
      <AuthProvider>
        <Global />
        <Router />
        <Toaster />
      </AuthProvider>
    </div>
  );
};
