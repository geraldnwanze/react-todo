import { RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import BaseProvider from "./providers/BaseProvider";
import useMyRouter from "./routes";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { MyRoutes } = useMyRouter();
  return (
    <BaseProvider>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={MyRoutes} />
      </AuthProvider>
    </BaseProvider>
  );
}

export default App;
